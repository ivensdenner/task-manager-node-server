import { randomUUID } from 'node:crypto'

export class Task {
    constructor(title, description) {
        this.title       = title
        this.description = description

        this.id           = randomUUID()
        this.completed_at = null
        this.created_at   = new Date()
        this.updated_at   = this.created_at
    }

    static fromData(data) {
        const task = new Task(data.title, data.description)

        task.id           = data.id
        task.completed_at = data.completed_at
        task.created_at   = new Date(data.created_at)
        task.updated_at   = new Date(data.updated_at)

        return task
    }

    update(title, description) {
        this.title       = title
        this.description = description

        this.updated_at = new Date()
    }

    toggleCompletion() {
        if (this.completed_at) {
            this.completed_at = null
        } else {
            this.completed_at = new Date()
        }
    }
}
