const router = require("express").Router()
const User = require("../models/user.js")
const Note = require("../models/note.js")

router.post("/reset", async (request, response) => {
    await User.deleteMany({})
    await Note.deleteMany({})

    response.status(204).end()
})

module.exports = router