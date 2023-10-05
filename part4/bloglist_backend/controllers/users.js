const User = require("../models/user.js")
const logger = require("../utils/logger.js")
const bcrypt = require("bcrypt")
const usersRouter = require("express").Router()

usersRouter.get("/", async (req, res, next) => {
	try
	{
		const users = await User.find({})
		res.status(200).json(users)
	}
	catch (error)
	{
		next(error)
	}
})

usersRouter.post("/", async (req, res, next) => {
	const { username, name, password } = req.body

	if (password.length < 3)
	{
		logger.error("Password must be at least 3 characters long.")
		return res.status(400).json({ error: "Password must be at least 3 characters long." })
	}
	
	const saltRounds = 10
	const passwordHash = password
		? await bcrypt.hash(password, saltRounds)
		: null
	
	const user = new User({ username, name, passwordHash })

	try
	{
		const savedUser = await user.save()
		res.status(201).json(savedUser)
	}
	catch (error)
	{
		next(error)
	}
})

module.exports = usersRouter