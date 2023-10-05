const logger = require("./logger.js")

const errorHandler = (error, request, response, next) => {
	logger.error(error.message)
	
	if (error.name === "ValidationError")
		return response.status(400).json({ error: error.message })
	if (error.message.startsWith("E11000 duplicate key error collection: bloglist.users index: username_1 dup key"))
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


module.exports = {
	errorHandler,
	requestLogger,
}