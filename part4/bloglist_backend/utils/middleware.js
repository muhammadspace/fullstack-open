const jwt = require("jsonwebtoken")
const User = require("../models/user.js")
const logger = require("./logger.js")

const errorHandler = (error, request, response, next) => {
    logger.error(error.message)
	
    if (error.name === "ValidationError")
        return response.status(400).json({ error: error.message })
    if (error.name === "MongoServerError" && error.message.startsWith("E11000 duplicate key error"))
        return response.status(400).json({ error: error.message })

    next(error)
}

const requestLogger = (request, response, next) => {
    logger.info("Path:", request.path)
    logger.info("Method:", request.method)
    logger.info("Body:", request.body)
    logger.info("=========================")
    next()
}

const tokenExtractor = (request, response, next) => {
    const authorization = request.get("Authorization") 
    if ( authorization && authorization.startsWith("Bearer ") )
    {
        const token = authorization.replace("Bearer ", "")
        request.token = token
    }

    next()
}

const userExtractor = async (request, response, next) => {
    if (request.method === "GET")
        return next()

    const decodedToken = jwt.decode(request.token, process.env.SECRET)
    if (!decodedToken)
        return response.status(401).json({ error: "Invalid token" })

    const user = await User.findById(decodedToken.id)
    request.user = user

    next()
}

module.exports = {
    errorHandler,
    requestLogger,
    tokenExtractor,
    userExtractor,
}