import { Database  } from "./database.js"
import { randomUUID } from 'node:crypto'

const database = new Database()

export const routes = [
    {
        method: 'GET',
        path: '/tasks',
        handler: (request, response) => {
            const users = database.select('users')
            return response.end(JSON.stringify(users))
        }
    },
    {
        method: 'POST',
        path: '/tasks',
        handler: (request, response) => {
            const { name, email } = request.body
            const user = {
                id: randomUUID(),
                name,
                email
            }
            database.insert('users', user)
            return response.writeHead(201).end()
        }
    },
    {
        method: 'PUT',
        path: '/tasks/:id',
        handler: (request, response) => {
            const { id } = request.params
            const { name, email } = request.body
            const user = {
                id,
                name,
                email
            }
            database.update('users', user)
            return response.writeHead(204).end()
        }
    },
    {
        method: 'DELETE',
        path: '/tasks/:id',
        handler: (request, response) => {
            const { id } = request.params
            database.delete('users', id)
            return response.writeHead(204).end()
        }
    },
    {
        method: 'PATCH',
        path: '/tasks/:id/complete',
        handler: (request, response) => {
            const { id } = request.params
            const user = database.select('users', id)
            const updatedUser = {
                ...user,
                completed: true
            }
            database.update('users', updatedUser)
            return response.writeHead(204).end()
        }
    }
]
