const config = require("./utils/config.js")
const logger = require("./utils/logger.js")
const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const notesRouter = require("./controllers/notes.js")
const middleware = require("./utils/middleware.js")

mongoose.set("strictQuery", false)

const uri = config.MONGODB_URI
logger.info("Connecting to", uri)
mongoose.connect(uri)
    .then( res => logger.info("Connected to MongoDB") )
    .catch( error => logger.error("Error connecting to MongoDB: ", error) )

const app = express()

app.use(express.static("dist"))
app.use(cors())
app.use(express.json())
app.use(middleware.requestLogger)

app.use("/api/notes", notesRouter)

app.get("/", (req, res) => {
    res.send("<h1>Hello World!</h1>")
})

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app