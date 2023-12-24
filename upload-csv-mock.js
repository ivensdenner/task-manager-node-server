import fs from 'node:fs';
import { parse } from 'csv-parse';

import { dirname } from 'path';
import { fileURLToPath } from 'url';
const __dirname = dirname(fileURLToPath(import.meta.url));

const processFile = async () => {
    const parser = fs
        .createReadStream(`${__dirname}/tasks-demo.csv`)
        .pipe(parse({ columns: true }))

    for await (const record of parser) {
        createTask(record);
    }
};

const createTask = async (record) => {
    const { title, description } = record

    fetch('http://localhost:3333/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, description })
    })
}

(async () => {
  await processFile();
  console.log("Done!");
})();
