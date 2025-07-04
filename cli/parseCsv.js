import { createReadStream } from "fs";
import { parse } from "csv-parse";

export async function parseCSV(filePath, encoding = "utf8", options = {}) {
	const records = [];

	// Create a read stream
	const parser = createReadStream(filePath, encoding).pipe(
		parse(options),
	);

	for await (const record of parser) {
		records.push(record);
	}

	return records;
}