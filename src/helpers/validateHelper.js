const { validationResult } = require('express-validator');
const Response = require('../../clases/response');

const validateResult = (req, res, next) => {
    try {
        validationResult(req).throw()
        return next()
    } catch (error) {
        res.status(403).send(new Response(true, 403, "Bad request", error.array()))
    }
}

module.exports = { validateResult }