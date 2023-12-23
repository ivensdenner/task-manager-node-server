import { Database  } from "./database.js"
import { randomUUID } from 'node:crypto'
import { Task } from "./task.js"
import { buildRoutePath } from "./utils/build-route-path.js"

const database   = new Database()
const tasksTable = 'tasks'

export const routes = [
    {
        method: 'GET',
        path: buildRoutePath('/tasks'),
        handler: (request, response) => {
            const tasks = database.select(tasksTable)
            return response.end(JSON.stringify(tasks))
        }
    },
    {
        method: 'POST',
        path: buildRoutePath('/tasks'),
        handler: (request, response) => {
            const { title, description } = request.body
            const task = new Task(title, description)

            database.insert(tasksTable, task)

            return response.writeHead(201).end()
        }
    },
    {
        method: 'PUT',
        path: buildRoutePath('/tasks/:id'),
        handler: (request, response) => {
            const { id } = request.params
            const { name, email } = request.body
            const user = {
                id,
                name,
                email
            }
            database.update(tasksTable, user)
            return response.writeHead(204).end()
        }
    },
    {
        method: 'DELETE',
        path: buildRoutePath('/tasks/:id'),
        handler: (request, response) => {
            const { id } = request.params
            database.delete('users', id)
            return response.writeHead(204).end()
        }
    },
    {
        method: 'PATCH',
        path: buildRoutePath('/tasks/:id/complete'),
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
