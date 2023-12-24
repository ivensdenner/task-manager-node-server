import http from 'node:http'
import { routes } from './routes.js'
import { json } from './middleware/json.js'
import { extractQueryParameters } from './utils/extract-query-parameters.js'

const server = http.createServer(async (request, response) => {
    const { method, url } = request

    await json(request, response)

    const route = routes.find(route => {
        return route.method === method && route.path.test(url)
    })

    if (route) {
        const routeParameters = url.match(route.path)

        const { query, ...parameters } = routeParameters.groups

        request.params = parameters
        request.query  = query ? extractQueryParameters(query) : {}

        return route.handler(request, response)
    }

    return response.writeHead(404).end()
})

server.listen(3333)
