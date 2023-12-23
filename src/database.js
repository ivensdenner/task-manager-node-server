import fs from 'node:fs/promises'

const databasePath = new URL('../database.json', import.meta.url)

export class Database {

    #database = {}

    constructor() { 
        fs.readFile(databasePath)
            .then(data => { this.#database = JSON.parse(data) })
            .catch(() => { this.#database = {} })
    }

    #persist() {
        fs.writeFile(databasePath, JSON.stringify(this.#database))
    }

    insert(table, data) {
        if (!this.#database[table]) {
            this.#database[table] = []
        }

        this.#database[table].push(data)

        this.#persist()

        return data
    }

    select(table) {
        return this.#database[table] ?? []
    }

}
