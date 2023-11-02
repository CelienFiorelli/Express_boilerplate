


const verifyParams = (params) => (req, res, next) => {
    const emptyField = [];
    const key = req.method == 'GET' ? 'query' : 'body'
    for (const param of params) {
        if (!Object.keys(req[key]).includes(param)) {
            emptyField.push(param)
        }
    }

    if (emptyField.length) {
        return res.send({ error: `${req.method} parameter ${emptyField.join(', ')} is required` })
    }
    next();
}


module.exports = { verifyParams }