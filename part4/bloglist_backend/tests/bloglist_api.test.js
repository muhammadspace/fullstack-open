const supertest = require("supertest")
const mongoose = require("mongoose")
const Blog = require("../models/blog.js")
const User = require("../models/user.js")
const app = require("../app.js")

const api = supertest(app)

const login = async (username, password) => {
    const response = await api
        .post("/api/login")
        .send({ username, password })

    return response.body.token
}

const initialBlogs = [
    {
        title: "The Art of Programming",
        author: "John Smith",
        url: "https://example.com/art-of-programming",
        likes: 124
    },
    {
        title: "Cooking Adventures",
        author: "Jane Doe",
        url: "https://example.com/cooking-adventures",
        likes: 72
    },
    {
        title: "Travel Tales",
        author: "Alex Johnson",
        url: "https://example.com/travel-tales",
        likes: 321
    },
    {
        title: "Fitness Tips",
        author: "Emily Brown",
        url: "https://example.com/fitness-tips",
        likes: 45
    },
    {
        title: "The World of Photography",
        author: "Michael Johnson",
        url: "https://example.com/photography-blog",
        likes: 98
    },
    {
        title: "Gardening Tips and Tricks",
        author: "Sarah Thompson",
        url: "https://example.com/gardening-tips",
        likes: 215
    },
    {
        title: "Bookworm's Corner",
        author: "David Anderson",
        url: "https://example.com/bookworms-corner",
        likes: 76
    },
    {
        title: "Tech Talk",
        author: "Jessica Lee",
        url: "https://example.com/tech-talk",
        likes: 512
    },
    {
        title: "Fashion Forward",
        author: "Sophia Roberts",
        url: "https://example.com/fashion-forward",
        likes: 192
    }
]

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

beforeEach(async () => {
    await Blog.deleteMany({})
    await User.deleteMany({})

    await Blog.insertMany(initialBlogs)

    for await (const u of initialUsers)
    {
        await api
            .post("/api/users")
            .send(u)
    }
})

describe("============BLOGS=============", () => {
    test("HTTP get request to /api/blogs returns all blogs", async () => {
        await api
            .get("/api/blogs")
            .expect(200)
            .expect("Content-Type", /application\/json/)
    })
    
    test("Fetched blogs have 'id' as the unique identifier property and not '_id'", async () => { const blogs = await api.get("/api/blogs")
        blogs.body.forEach( blog => expect(blog.id).toBeDefined())
    })

    test("HTTP POST requests add a new entry and save it to the database", async () => {
        const entry = {
            "title": "how to fouteball",
            "author": "ebrahimbovich",
            "url": "https://example.com/6",
            "likes": 6,
        }
        
        const token = await login("alexj", "12345678")
    
        await api
            .post("/api/blogs")
            .set("Authorization", `Bearer ${token}`)
            .send(entry)
            .expect(201)
            .expect("Content-Type", /application\/json/)
    
        const allBlogs = await Blog.find({})
        expect(allBlogs).toHaveLength(initialBlogs.length + 1)
        
        const lastBlogInDB = allBlogs[allBlogs.length-1]
        expect(lastBlogInDB.title).toEqual(entry.title)
    })

    test("The 'likes' property defaults to 0 if it is missing from the POST request", async () => {
        const entry = {
            "title": "i kinda don't like async/await",
            "author": "muhammad",
            "url": "https://example.com/asyncawait",
        }

        const token = await login("alexj", "12345678")

        await api
            .post("/api/blogs")
            .set("Authorization", `Bearer ${token}`)
            .send(entry)
            .expect(201)
            .expect("Content-Type", /application\/json/)

        const blogs = await Blog.find({})
        const lastBlogInDB = blogs[blogs.length - 1]
        expect(lastBlogInDB.likes).toBe(0)
    })

    test("The server responds with status code 400 if the 'title' or 'url' properties are missing from the POST request", async () => {
        const entry = {
            "url": "https://example.com/",
            "author": "anon"
        }

        const token = await login("alexj", "12345678")

        await api
            .post("/api/blogs")
            .set("Authorization", `Bearer ${token}`)
            .send(entry)
            .expect(400)
    })

    test("Deletion of a blog works with its '_id' property", async () => {
        // Login
        const response = await api
            .post("/api/login")
            .send({ username: "alexj", password: "12345678" })

        // Get token
        const token = response.body.token

        // Post a new blog with the logged-in user so that there's something to delete
        const postRequest = await api
            .post("/api/blogs")
            .set("Authorization", `Bearer ${token}`)
            .send(initialBlogs[0])

        const postedBlogId = postRequest.body.id

        // Delete blog
        await api 
            .delete(`/api/blogs/${postedBlogId}`) 
            .set("Authorization", `Bearer ${token}`)
            .expect(204)
    })

    /*
    test("Updating the number of likes of a blog using its '_id' property works", async () => {
        // Login
        const response = await api
            .post("/api/login")
            .send({ username: "alexj", password: "12345678" })

        // Get token
        const token = response.body.token

        // Posting a blog with the logged-in user so there's something to update
        const postRequest = await api
            .post("/api/blogs")
            .set("Authorization", `Bearer ${token}`)
            .send(initialBlogs[0])

        const postedBlogId = postRequest.body.id

        await api
            .put(`/api/blogs/${postedBlogId}`)
            .send({ "likes": -2 })

        const updatedFirstBlog = await Blog.findById(firstBlog._id)
        expect(updatedFirstBlog.likes).toBe(-2)
    })
    */

    test("Adding a new blog fails with 401 Unauthorized if no token is provided", async () => {
        await api
            .post("/api/blogs")
            .send(initialBlogs[0])
            .expect(401)
    })
})

afterAll( async () => {
    await mongoose.connection.close()
})