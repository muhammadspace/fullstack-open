require("dotenv").config()

const PORT = process.env.PORT || 3001
const MONGODB_URI = process.env.MONGODB_URI || "mongodb+srv://fullstack:fullstack@fso.khnzyyx.mongodb.net/bloglist?retryWrites=true&w=majority"

module.exports = {
    PORT,
    MONGODB_URI
}