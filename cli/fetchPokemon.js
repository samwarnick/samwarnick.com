import { createReadStream } from "fs";
import { writeFile } from "fs/promises";
import { parse } from "csv-parse";
import pokemon from "pokemontcgsdk";

async function parseCSV(filePath) {
	const records = [];

	// Create a read stream
	const parser = createReadStream(filePath, "utf-16le").pipe(
		parse({
			columns: true,
			skip_empty_lines: true,
			trim: true,
			delimiter: ";",
			bom: true,
		}),
	);

	for await (const record of parser) {
		records.push(record);
	}

	return records;
}

async function chunkedMap(array, asyncCallback, chunkSize = 3) {
	const results = [];
	for (let i = 0; i < array.length; i += chunkSize) {
		const chunk = array.slice(i, i + chunkSize);
		const chunkPromises = chunk.map(asyncCallback);
		results.push(...(await Promise.all(chunkPromises)));
	}
	return results;
}

async function getCardData(card) {
	const id = card.Id.replace(/([0-9])(5)-/, "$1pt$2-");
	return await pokemon.card.find(id);
}

async function getCollectionData(collection, name) {
	const data = await chunkedMap(collection, getCardData);
	const sets = [];
	data.forEach((card) => {
		const set = sets.find((s) => s.id === card.set.id);
		if (set) {
			const existing = set.cards.find((c) => c.id === card.id);
			if (!existing) {
				set.cards.push(card);
			}
		} else {
			sets.push({
				...card.set,
				cards: [card],
			});
		}
	});
	sets.sort((a, b) => a.releaseDate.localeCompare(b.releaseDate));
	sets.forEach((set) => {
		set.cards = set.cards.sort((a, b) => a.number.localeCompare(b.number));
	});
	await writeFile(
		`src/_data/pokemon/${name}.json`,
		JSON.stringify(sets, null, 2),
		"utf8",
	);
}

const csvData = await parseCSV("./cli/dexcollection.csv.txt");
const myCollection = csvData.filter((card) => {
	return (
		card.Category === "My Collection" &&
		card.Price !== "—" &&
		card.Price > "$0.99"
	);
});
const wishlist = csvData.filter((card) => {
	return card.Category === "Wishlist";
});

pokemon.configure({ apiKey: process.env.POKEMON_TCG_TOKEN });
await getCollectionData(myCollection, "myCollection");
await getCollectionData(wishlist, "wishlist");
await writeFile(
	`src/_data/pokemon/lastUpdated.json`,
	JSON.stringify({ date: Date.now() }, null, 2),
	"utf8",
);
