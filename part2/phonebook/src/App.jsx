import { useState, useEffect } from 'react'
import axios from 'axios'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  useEffect( () => {
    axios
      .get("https://probable-potato-p677x67prgrfvjw-3001.app.github.dev/persons")
      .then( res => setPersons(res.data))
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()

    let exists = false
    persons.forEach( person => {
      if (person.name === newName)
      {
        exists = true
      }
    })

    if (exists)
    {
      alert(`${newName} is already added to the phonebook`)
      return
    }
    const newPersonObject = { name: newName, number: newNumber }

    setPersons(persons.concat(newPersonObject))
    setNewName('')
    setNewNumber('')
  }

  const handleNameChange = (e) => setNewName(e.target.value)
  const handleNumberChange = (e) => setNewNumber(e.target.value)
  const handleFilter = (e) => setFilter(e.target.value)

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter handleFilter={handleFilter} />
      <PersonForm 
        handleSubmit={handleSubmit}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Persons persons={persons} filter={filter} />
    </div>
  )
}

const PersonForm = ({ handleSubmit, newName, handleNameChange, newNumber, handleNumberChange }) => {
  return (
    <div>
    <h2>Add new</h2>
    <form onSubmit={handleSubmit}>
      <div>name: <input value={newName} onChange={handleNameChange} /></div>
      <div>number: <input value={newNumber} onChange={handleNumberChange} /></div>
      <div><button type="submit">add</button></div>
    </form>
  </div>
  )
}

const Persons = ({ persons, filter }) => {
  return (
    <ul>
      { 
        (filter === '') 
        ? persons.map( person => <li key={person.name}>{person.name} {person.number}</li>) 
        : persons.map( person => person.name.toLowerCase().includes(filter.toLowerCase()) ? <li key={person.name}>{person.name} {person.number}</li> : null)
      }
      </ul>
  )
}

const Filter = ({ handleFilter}) => <div>filter shown with <input onChange={handleFilter}/></div>

export default App