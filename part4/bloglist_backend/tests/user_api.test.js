const User = require("../models/user.js")
const supertest = require("supertest")
const app = require("../app.js")
const mongoose = require("mongoose")

const api = supertest(app)

describe("Invalid users", () => {
	let usersLength = 0

	beforeEach( async () => {
		const users = await User.find({})
		usersLength = users.length
	})

	test("A user whose username is less than 3 characters is not created", async () => {
		await api
			.post("/api/users")
			.send(
				{
					username: "a",
					name: "short username",
					password: "12345678"
				}
			)
			.expect(400)

		const usersAfterAttempt = await User.find({})
		expect(usersAfterAttempt).toHaveLength(usersLength)
	})

	test("A user whose username is not unique is not created", async () => {
		await api
			.post("/api/users")
			.send(
				{
					username: "mjacjosn",
					name: "not unique username",
					password: "12345678"
				}
			)
			.expect(400)

			const usersAfterAttempt = await User.find({})
			expect(usersAfterAttempt).toHaveLength(usersLength)
	})
})

afterAll( async () => {
	await mongoose.connection.close()
})