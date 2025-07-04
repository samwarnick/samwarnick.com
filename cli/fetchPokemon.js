import { writeFile } from "fs/promises";

import pokemon from "pokemontcgsdk";
import {parseCSV} from "./parseCsv.js";

const PROMO_SETS = {
	svp: "2023/02/01",
};

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
	console.log("getCardData:", card.Id);
	try {
		const id = card.Id.replace(/(sv[0-9])(5)-/, "$1pt$2-");
		return await pokemon.card.find(id);
	} catch (error) {
		console.log(`failed to get card data for ${card.Id}`);
		return null;
	}
}

async function getCollectionData(collection, name) {
	const data = (await chunkedMap(collection, getCardData)).filter(element => element !== null);
	const sets = [];
	data.forEach((card) => {
		let setId = card.set.id;
		const set = sets.find((s) => s.id === setId);
		if (set) {
			const existing = set.cards.find((c) => c.id === card.id);
			if (!existing) {
				set.cards.push(card);
			}
		} else {
			sets.push({
				...card.set,
				id: setId,
				releaseDate: PROMO_SETS[card.set.id] ?? card.set.releaseDate,
				cards: [card],
			});
		}
	});
	sets.sort((a, b) => a.releaseDate.localeCompare(b.releaseDate));
	sets.forEach((set) => {
		set.cards = set.cards.sort((a, b) => {
			if (set.id === "swsh12pt5") {
				if (a.set.id === "swsh12pt5gg" && b.set.id === "swsh12pt5") {
					return 1;
				} else if (b.set.id === "swsh12pt5gg" && a.set.id === "swsh12pt5") {
					return -1;
				}
			}
			return parseInt(a.number) - parseInt(b.number);
		});
	});
	await writeFile(
		`src/_data/pokemon/${name}.json`,
		JSON.stringify(sets, null, 2),
		"utf8",
	);
}

const csvData = await parseCSV("./cli/dexcollection.csv.txt", "utf-16le", {
	columns: true,
	skip_empty_lines: true,
	trim: true,
	delimiter: ";",
	bom: true,
});
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
const EEVEELUTIONS = [
	'Eevee',
	'Vaporeon',
	'Jolteon',
	'Flareon',
	'Espeon',
	'Umbreon',
	'Leafeon',
	'Glaceon',
	'Sylveon',
];
const eeveelutions = csvData.filter((card) => {
	return (
		card.Category === "My Collection" &&
		EEVEELUTIONS.some((name) => name.includes(card.Name))
	)
})

pokemon.configure({ apiKey: process.env.POKEMON_TCG_TOKEN });
await getCollectionData(myCollection, "myCollection");
await getCollectionData(wishlist, "wishlist");
await getCollectionData(eeveelutions, "eeveelutions");
await writeFile(
	`src/_data/pokemon/lastUpdated.json`,
	JSON.stringify({ date: Date.now() }, null, 2),
	"utf8",
);
