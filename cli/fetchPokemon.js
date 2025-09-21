import {parseCSV} from "./parseCsv.js";
import {readdir, writeFile} from "node:fs/promises";
import {join} from "node:path";
import {readFileSync} from "fs";

const PROMO_SETS = {
	svp: "2023/02/01",
};

function getCardData({Id}) {
	try {
		const id = Id
			.replace("sv105b", "zsv10pt5")
			.replace("sv105w", "rsv10pt5")
			.replace(/(sv[0-9])(5)-/, "$1pt$2-");
		const card = cards.get(id);
		const setId = id.split("-")[0];
		const set = sets.get(setId);
		if (card && set) {
			return {
				...card,
				set
			}
		}
		console.log(`failed to get card data for ${Id}`);
		return null;
	} catch (error) {
		console.log(error);
		console.log(`failed to get card data for ${Id}`);
		return null;
	}
}

async function getCollectionData(collection, name) {
	const data = collection.map(getCardData).filter(element => element !== null);
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

const cards = new Map();
const sets = new Map();

async function loadData() {
	const cardsDir = "./cli/pokemon_tcg_data/cards/en";
	const files = await readdir(cardsDir);
	for (const file of files) {
		if (file.endsWith('.json')) {
			const filePath = join(cardsDir, file)
			const cardData = JSON.parse(readFileSync(filePath, 'utf-8'))
			for (const card of cardData) {
				cards.set(card.id, card)
			}
		}
	}
	const setsData = JSON.parse(readFileSync("./cli/pokemon_tcg_data/sets/en.json"));
	for (const set of setsData) {
		sets.set(set.id, set)
	}
}

await loadData();

console.log(getCardData({Id: "svp-171"}));

await getCollectionData(myCollection, "myCollection");
await getCollectionData(wishlist, "wishlist");
await getCollectionData(eeveelutions, "eeveelutions");
await writeFile(
	`src/_data/pokemon/lastUpdated.json`,
	JSON.stringify({ date: Date.now() }, null, 2),
	"utf8",
);
