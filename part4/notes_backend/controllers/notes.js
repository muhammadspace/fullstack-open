const notesRouter = require("express").Router()
const Note = require("../models/note.js")

notesRouter.get("/", async (req, res) => {
    const notes = await Note.find({})
    res.json(notes)
})

notesRouter.post("/", (request, response, next) => {
    const body = request.body

    const note = new Note({
        content: body.content,
        important: body.important || false,
    })

    note.save()
        .then( savedNote => {
            response.status(201).json(savedNote)
        })
        .catch( error => next(error))
})

notesRouter.get("/:id", (request, response, next) => {
    Note.findById(request.params.id)
        .then( note => {
            console.log(note)
            if (note) response.status(200).json(note)
            else response.status(404).send("404 Not Found")
        })
        .catch( error => next(error))

})

notesRouter.delete("/:id", (request, response, next) => {
    Note.findByIdAndDelete(request.params.id)
        .then( result => response.status(204).end() )
        .catch( error => next(error) )
})

notesRouter.put("/:id", (req, res, next) => {
    const { content, important } = req.body

    Note.findByIdAndUpdate(
        req.params.id,
        { content, important },
        { new: true, runValidators: true, context: "query" }
    )
        .then( updated => res.status(200).json(updated) )
        .catch( error => next(error) )
})

module.exports = notesRouter