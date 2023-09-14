require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person.js')

const app = express()

const unknownEndpoint = (req, res) => {
  res.status(400).send({error: 'Unknown endpoint'})
}

const errorHandler = (error, req, res, next) => {
  console.log(error)
  if (error.name === "CastError")
    res.status(400).json({error: "Malformatted ID"})
  if (error.name === "SyntaxError")
    res.status(500).json({error: "Internal server syntax error"})

  next(error)
}

morgan.token('body', (req, res) => JSON.stringify(req.body))

app.use(express.static('dist'))
app.use(cors())
app.use(express.json())
app.use(morgan( (tokens, req, res) => {
  return [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, 'content-length'), '-',
    tokens['response-time'](req, res), 'ms',
    tokens.body(req, res)
  ].join(' ')
}))

let phonebook = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get('/api/persons', (req, res) => {
  Person.find({}).then( people => res.json(people) )
})

app.get('/info', (req, res, next) => {
  const dateReceived = new Date()
  Person.find({}).then( people => {
    const length = people.length
    res.send(`
      <p>Phonebook has information for ${length} people</p>
      <p>${dateReceived.toString()}</p>
    `)})
    .catch( error => next(error) )
})

app.get('/api/persons/:id', (req, res, next) => {
  const id = req.params.id

  Person.findById(id)
    .then( person => {
      if (person) 
        res.status(200).json(person)
      else 
        res.status(404).send('404 Not Found')
    })
    .catch( error => next(error) )
})

app.delete('/api/persons/:id', (req, res, next) => {
  const id = req.params.id

  Person.findByIdAndDelete(id)
    .then( result => {
      if (result)
        res.status(204).end()
      else
        res.status(404).json({error: "404: No person was found with that ID."})
    })
    .catch( error => next(error) )
})

app.post('/api/persons', (req, res, next) => {
  const person = Person(
    {
      ...req.body,
    }
  )

  person.save()
    .then( response => console.log(`Added ${person.name}`) )
    .catch( error => console.error(`Couldn't add ${person.name}`, error) )
})

app.put('/api/persons/:id', (req, res, next) => {
  const id = req.params.id

  Person.findByIdAndUpdate(id, req.body, {new: true})
    .then( result => res.status(200).json(result) )
    .catch( error => next(error) )
})

app.use(unknownEndpoint)
app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))