import http from 'node:http'
import { routes } from './routes.js'

const server = http.createServer(async (request, response) => {
    const { method, url } = request

    const route = routes.find(route => {
        const methodMatches = route.method === method || route.method === '*'
        const urlMatches = route.path === url || route.path === '*'

        return methodMatches && urlMatches
    })

    if (route) {
        return route.handler(request, response)
    }

    return response.writeHead(404).end()
})

server.listen(3333)
