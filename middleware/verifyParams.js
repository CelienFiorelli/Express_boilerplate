

const verifyParams = (endpoint) => (req, res, next) => {
    const emptyField = [];
    const key = endpoint.method == 'get' ? 'query' : 'body'
    for (const param of endpoint.params) {
        if (!Object.keys(req[key]).includes(param)) {
            emptyField.push(param)
        }
    }

    if (emptyField.length) {
        return res.send({ error: `${endpoint.method} parameter ${emptyField.join(', ')} is required` })
    }
    next();
}


module.exports = { verifyParams }