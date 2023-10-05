const bcrypt = require("bcrypt")
const User = require("../models/user.js")
const jwt = require("jsonwebtoken")
const loginRouter = require("express").Router()

loginRouter.post("/", async (req, res, next) => {
    const { username, password } = req.body

    const user = await User.findOne({ username })
    const passwordIsCorrect = user === null
        ? false
        : await bcrypt.compare(password, user.passwordHash)

    if ( !(user && passwordIsCorrect) )
        return res.status(401).json({ error: "Incorrect username or password" })

    const tokenUserObject = {
        username: user.username,
        id: user._id
    }

    const token = jwt.sign(tokenUserObject, process.env.SECRET, { expiresIn: 60*60 })

    res.status(200).send({ token, username: user.username, name: user.name})
})

module.exports = loginRouter