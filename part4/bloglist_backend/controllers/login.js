const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const User = require("../models/user.js")
const loginRouter = require("express").Router()

loginRouter.post("/", async (req, res, next) => {
    const { username, password } = req.body
    
    try
    {
        const user = await User.findOne({ username })
        if (!user)
            return res.status(401).json({ error: "Invalid username or password" })
        
        const passwordIsValid = await bcrypt.compare(password, user.passwordHash)

        if ( !(passwordIsValid && username) )
            return res.status(401).json({ error: "Invalid username or password" })

        const userForToken = { username: user.username, id: user._id }
        const token = jwt.sign(userForToken, process.env.SECRET)

        res.status(200).json({ token, username: user.username, name: user.name })
    }
    catch (error)
    {
        next(error)
    }
})


module.exports = loginRouter