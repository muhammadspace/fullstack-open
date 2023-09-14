require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const Note = require('./models/note.js')

const app = express()

app.use(express.static('dist'))
app.use(cors())
app.use(express.json())
app.use(morgan('tiny'))

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, req, res, next) => {
  console.log(error)

  if (error.name === "CastError")
    res.status(400).send({error: "Malformatted id"})

  next(error)
}

let notes = [
  {
    id: 1,
    content: "HTML is easy",
    important: true
  },
  {
    id: 2,
    content: "Browser can execute only JavaScript",
    important: false
  },
  {
    id: 3,
    content: "GET and POST are the most important methods of HTTP protocol",
    important: true
  }
]


app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>')
})

app.get('/api/notes', (req, res) => {
  Note.find({}).then( notes => {
    res.json(notes)
  })
})

app.post('/api/notes', (request, response) => {
  const body = request.body

  if (!body.content) {
    return response.status(400).json({ 
      error: 'content missing' 
    })
  }

  const note = new Note({
    content: body.content,
    important: body.important || false,
  })

  note.save().then( savedNote => {
    response.json(savedNote)
  })
})

app.get('/api/notes/:id', (request, response, next) => {
    Note.findById(request.params.id)
      .then( note => {
        console.log(note)
          if (note) response.status(200).json(note)
          else response.status(404).send('404 Not Found')
      })
      .catch( error => next(error))

})

app.delete('/api/notes/:id', (request, response, next) => {
  Note.findByIdAndDelete(request.params.id)
    .then( result => response.status(204).end() )
    .catch( error => next(error) )
})

app.put("/api/notes/:id", (req, res, next) => {
  console.log(req.body);
  Note.findByIdAndUpdate(req.params.id, req.body, {new: true})
    .then( updated => res.status(200).json(updated) )
    .catch( error => next(error) )
})

app.use(unknownEndpoint)

app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})