const express = require('express')
const morgan = require('morgan')

const app = express()

morgan.token('body', (req, res) => JSON.stringify(req.body))

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
  res.json(phonebook)
})

app.get('/info', (req, res) => {
  const dateReceived = new Date()
  res.send(`
    <p>Phonebook has information for ${phonebook.length} people</p>
    <p>${dateReceived.toString()}</p>
  `)
})

app.get('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  const person = phonebook.find( p => p.id === id )

  if (person)
    res.json(person)
  else
    res.status(404).send('<p>404: not found</p>')
})

app.delete('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  const person = phonebook.find( p => p.id === id)

  if (person)
  {
    phonebook = phonebook.filter( entry => entry.id !== id )
    res.status(204).end()
console.log(`${person.name} deleted`)
  }
  else
  {
    res.status(404).send('<p>There is no entry with this ID.</p>')
  }
})

app.post('/api/persons', (req, res) => {
  const newId = Math.floor((Math.random() + 100) * 10) 
  const newPerson = { ...req.body, id: newId }

  if (newPerson)
  {
    if (!newPerson.name)
      return res.status(400).json({ error: 'name is missing' })
    if (!newPerson.number)
      return res.status(400).json({ error: 'number is missing' })
    if (phonebook.find( person => person.name === newPerson.name ))
      return res.status(400).json({ error: 'name must be unique' })
console.log(`${newPerson.name} added`)
    phonebook.push(newPerson)
    res.json(newPerson)
  }
  else
  {
    res.status(400).send('could not read request data')
  }
})

const PORT = 3001
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))