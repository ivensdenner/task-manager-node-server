import { randomUUID } from 'node:crypto'

export const Task = {
    init: function(title, description) {
        this.title       = title
        this.description = description

        this.id           = randomUUID()
        this.completed_at = null
        this.created_at   = new Date()
        this.updated_at   = this.created_at

        return this;
    },

    update: function(title, description) {
        this.title       = title
        this.description = description

        this.updated_at = new Date()

        return this;
    },

    toggleCompletion: function() {
        if (this.completed_at) {
            this.completed_at = null
        } else {
            this.completed_at = new Date()
        }

        return this;
    },
}
