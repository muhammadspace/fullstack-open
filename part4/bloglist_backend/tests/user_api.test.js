const User = require("../models/user.js")
const supertest = require("supertest")
const app = require("../app.js")
const mongoose = require("mongoose")

const api = supertest(app)

const initialUsers = [
    {
        username: "admin",
        name: "admin",
        password: "admin"
    },
    {
        username: "johnsmith",
        name: "John Smith",
        password: "12345678"
    },
    {
        username: "janedoe",
        name: "Jane Doe",
        password: "12345678"
    },
    {
        username: "alexj",
        name: "Alex Johnson",
        password: "12345678"
    },
]

beforeEach( async () => {
    await User.deleteMany({})

    for await (const user of initialUsers)
    {
        await api
            .post("/api/users")
            .send(user)
    }
})

describe("Invalid users", () => {

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
        expect(usersAfterAttempt).toHaveLength(initialUsers.length)
    })

    test("A user whose username is not unique is not created", async () => {
        await api
            .post("/api/users")
            .send(initialUsers[0])
            .expect(400)

        const usersAfterAttempt = await User.find({})
        expect(usersAfterAttempt).toHaveLength(initialUsers.length)
    })
})

afterAll( async () => {
    await mongoose.connection.close()
})