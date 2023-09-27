const supertest = require("supertest")
const mongoose = require("mongoose")
const Blog = require("../models/blog.js")
const app = require("../app.js")

const api = supertest(app)

const initialBlogs = [
    {
        "title": "blog 1",
        "author": "michael scott",
        "url": "https://example.com/1",
        "likes": 12,
    },
    {
        "title": "blog 2",
        "author": "michael scott",
        "url": "https://example.com/2",
        "likes": 13,
    }
]

beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(initialBlogs)
})

describe("HTTP GET", () => {
    test("HTTP get request to /api/blogs returns all blogs", async () => {
        await api
            .get("/api/blogs")
            .expect(200)
            .expect("Content-Type", /application\/json/)
    })
    
    test("fetched blogs have 'id' as the unique identifier property and not '_id'", async () => {
        const blogs = await api.get("/api/blogs")
        blogs.body.forEach( blog => expect(blog.id).toBeDefined())
    })
})

describe("HTTP POST", () => {
    test("HTTP POST requests add a new entry and save it to the database", async () => {
        const entry = {
            "title": "how to fouteball",
            "author": "ebrahimbovich",
            "url": "https://example.com/6",
            "likes": 6,
        }
    
        await api
            .post("/api/blogs")
            .send(entry)
            .expect(201)
            .expect("Content-Type", /application\/json/)
    
        const allBlogs = await Blog.find({})
        expect(allBlogs).toHaveLength(initialBlogs.length + 1)
        
        const lastBlogInDB = allBlogs[allBlogs.length-1]
        expect(lastBlogInDB.title).toEqual(entry.title)
    })

    test("if the 'likes' property is missing, it will default to 0", async () => {
        const entry = {
            "title": "i kinda don't like async/await",
            "author": "muhammad",
            "url": "https://example.com/asyncawait",
        }

        await api
            .post("/api/blogs")
            .send(entry)
            .expect(201)
            .expect("Content-Type", /application\/json/)

        const blogs = await Blog.find({})
        const lastBlogInDB = blogs[blogs.length - 1]
        expect(lastBlogInDB.likes).toBe(0)
    })

    test("if the 'title' or or 'url' properties are missing, the server responds with status code 400 Bad Request", async () => {
        const entry = {
            "url": "https://example.com/",
            "author": "anon"
        }

        await api
            .post("/api/blogs")
            .send(entry)
            .expect(400)
    })
})

describe("HTTP DELETE", () => {
    test("deletion of a blog works through its '_id' property", async () => {
        const blogs = await Blog.find({})
        const firstBlog = blogs[0]

        await api
            .delete(`/api/blogs/${firstBlog._id}`)
            .expect(204)
    })
})

describe("HTTP PUT", () => {
    test("updating the number of likes of a blog using its '_id' works", async () => {
        const blogs = await Blog.find({})
        const firstBlog = blogs[0]

        await api
            .put(`/api/blogs/${firstBlog._id}`)
            .send({ "likes": -2 })

        const updatedFirstBlog = await Blog.findById(firstBlog._id)
        expect(updatedFirstBlog.likes).toBe(-2)
    })
})

afterAll( async () => {
    await mongoose.connection.close()
})