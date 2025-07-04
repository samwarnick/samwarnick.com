import {parseCSV} from "./parseCsv.js";
import {writeFile} from "fs/promises";

const csvData = await parseCSV("./cli/bookshelf.csv", "utf8", {
	columns: true,
	skip_empty_lines: true,
	trim: true,
	delimiter: ",",
	bom: true,
});

const books = csvData.map((book) => ({
	id: book["Reading List ID"],
	isbn: book["ISBN-13"],
	title: book["Title"],
	author: book["Authors"],
	startedReading: book["Started Reading"],
	finishedReading: book["Finished Reading"],
	didNotFinish: book["Did Not Finish"],
})).sort((a, b) => new Date(b.finishedReading) - new Date(a.finishedReading));

const readBooks = books.filter(({finishedReading, didNotFinish}) => !!finishedReading && !didNotFinish);
const years = readBooks.map(({finishedReading}) => (new Date(finishedReading)).getFullYear());
const uniqueYears = [...new Set(years)];

const booksByYear = uniqueYears.reduce((acc, year) => {
	const filteredBooks = readBooks.filter(
		({finishedReading}) => new Date(finishedReading).getFullYear() === year,
	);

	return [...acc, { year, books: filteredBooks }];
}, []);

const inProgressBooks = books.filter(({startedReading, finishedReading}) => !!startedReading && !finishedReading);

await writeFile(
	`src/_data/bookshelf/read.json`,
	JSON.stringify(booksByYear, null, 2),
	"utf8",
);
await writeFile(
	`src/_data/bookshelf/inProgress.json`,
	JSON.stringify(inProgressBooks, null, 2),
	"utf8",
);
await writeFile(
	`src/_data/bookshelf/lastUpdated.json`,
	JSON.stringify({ date: Date.now() }, null, 2),
	"utf8",
);