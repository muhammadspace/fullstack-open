const mongoose = require("mongoose")
const supertest = require("supertest")
const app = require("../app.js")
const Note = require("../models/note.js")

const api = supertest(app)

const initialNotes = [
    {
        content: "HTML is easy",
        important: false
    },
    {
        content: "Browser can execute only JavaScript",
        important: true
    }
]

beforeEach( async () => {
    await Note.deleteMany({})

    let noteObject = new Note(initialNotes[0])
    await noteObject.save()

    noteObject = new Note(initialNotes[1])
    await noteObject.save()
})

test("notes are returned as json", async () => {
    await api
        .get("/api/notes")
        .expect(200)
        .expect("Content-Type", /application\/json/)
})

test("a valid note is added", async () => {
    const newNote = {
        content: "async/await simplify making asynchronous calls",
        important: true
    }

    await api
        .post("/api/notes")
        .send(newNote)
        .expect(201)
        .expect("Content-Type", /application\/json/)

    const response = await api.get("/api/notes")
    const contents = response.body.map( note => note.content )

    expect(response.body).toHaveLength(initialNotes.length + 1)
    expect(contents).toContain(newNote.content)
})

test("a note with empty content will not be added", async () => {
    const newNote = {
        content: "",
        important: false
    }

    await api
        .post("/api/notes")
        .send(newNote)
        .expect(400)
        .expect("Content-Type", /application\/json/)

    const response = await api.get("/api/notes")
    const notes = response.body

    expect(notes).toHaveLength(initialNotes.length)
})

afterAll(async () => {
    await mongoose.connection.close()
})