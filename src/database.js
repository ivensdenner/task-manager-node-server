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

    select(table, search) {
        let data = this.#database[table] ?? []

        if (search) {
            data = data.filter(row => {
                return Object.entries(search).some(([key, value]) => {
                    return row[key].toLowerCase().includes(value.toLowerCase())
                })
            })
        }

        return data
    }

    update(table, data) {
        const index = this.#database[table].findIndex(row => row.id === data.id)

        if (index > -1) {
            this.#database[table][index] = data
        }

        this.#persist()
    }

    delete(table, id) {
        const index = this.#database[table].findIndex(row => row.id === id)

        if (index > -1) {
            this.#database[table].splice(index, 1)
            this.#persist()

            return true
        }

        return false
    }

}
