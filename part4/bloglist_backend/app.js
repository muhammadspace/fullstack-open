const config = require("./utils/config.js")
const logger = require("./utils/logger.js")
const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const blogRouter = require("./controllers/blogs.js")

const app = express()

logger.info(`Connecting to ${config.MONGODB_URI}`)
mongoose.set("strictQuery", false)
mongoose.connect(config.MONGODB_URI)
    .then( () => logger.info("Connected to MongoDB"))
    .catch( error => logger.error("Could not connect to MongoDB:", error))

app.use(cors())
app.use(express.json())
app.use("/api/blogs", blogRouter)

app.get("/", (req, res) => {
    res.send("<h1>Hello Blog List!")
})

module.exports = app