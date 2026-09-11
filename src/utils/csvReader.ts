import fs from 'fs';
import path from 'path';
import { parse } from 'csv-parse/sync';

export function readCSV(filePath: string) {
    const fullPath = path.resolve(filePath);
    console.log(`Reading CSV file from: ${fullPath}`);
    const content = fs.readFileSync(fullPath);

    const records = parse(content, {
        columns: true,
        skip_empty_lines: true,

    });
    return records;
}