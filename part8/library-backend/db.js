require("dotenv").config()
const mongoose = require("mongoose")
mongoose.set("strictQuery", false)

mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log("MongoDB connected")
    })
    .catch((error) => {
        console.log("Could not connect to MongoDB")
        throw error
    })