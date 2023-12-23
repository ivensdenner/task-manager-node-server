export function extractQueryParameters(query) {
    return query.substring(1).split('&').reduce((parameters, parameter) => {
        const [key, value] = parameter.split('=')
        parameters[key] = value
        return parameters
    }, {})
}
