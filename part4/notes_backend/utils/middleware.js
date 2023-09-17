const logger = require("./logger.js")

const requestLogger = (req, res, next) => {
    logger.info(req.method, req.path, req.body)
    next()
}

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: "unknown endpoint" })
}

const errorHandler = (error, req, res, next) => {
    logger.error(error)

    if (error.name === "CastError")
        res.status(400).send({ error: "Malformatted id" })
    if (error.name === "ValidationError")
        res.status(400).send({ error: error.message })

    next(error)
}

module.exports = {
    requestLogger,
    unknownEndpoint,
    errorHandler,
}