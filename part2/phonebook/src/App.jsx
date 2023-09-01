import { useState, useEffect } from 'react'
import personService from './services/persons'
import Notification from './components/Notification'
import Error from './components/Error'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect( () => {
    personService.getAll()
      .then( data => setPersons(data))
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    const newPersonObject = { name: newName, number: newNumber }

    let exists = false
    persons.forEach( person => {
      if (person.name === newName)
      {
        exists = true
      }
    })

    if (exists)
    {
        if (window.confirm(`${newName} is already added to the phonebook. Replace the old number with the new one?`))
        {
            const id = persons.find( person => person.name == newName).id
            personService
                .update(id, newPersonObject)
                .then( data => {
                    setPersons(persons.map( person => person.name === newName ? data : person))
                    setNotificationMessage(`Changed ${newName}'s phone number to ${data.number}`)
                    setTimeout(() => setNotificationMessage(null), 3000)
                    setNewName('')
                    setNewNumber('')
                })
                .catch( error => {
                    setPersons(persons.filter( person => person.name !== newName))
                    setErrorMessage(`Information of ${newName} has already been removed from the server.`)
                    setTimeout(() => setErrorMessage(null), 3000)
                    setNewName('')
                    setNewNumber('')
                })
        
            return
        }
    }

    personService.create(newPersonObject)
    .then( data => {
        setPersons(persons.concat(data))
        setNotificationMessage(`Added ${newName}`)
        setTimeout(() => setNotificationMessage(null), 3000)
        setNewName('')
        setNewNumber('')
    })

  }

  const handleDelete = (name) => {
    if (window.confirm(`Delete ${name}?`))
    {
        const id = persons.find( person => person.name === name).id 
        personService
            .deletePerson(id)
            .then( res => {
                setPersons(persons.filter( person => person.name !== name))
                setNotificationMessage(`Deleted ${name}`)
                setTimeout(() => setNotificationMessage(null), 3000)
            })
    }
  }

  const handleNameChange = (e) => setNewName(e.target.value)
  const handleNumberChange = (e) => setNewNumber(e.target.value)
  const handleFilter = (e) => setFilter(e.target.value)

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notificationMessage} />
      <Error message={errorMessage} />
      <Filter handleFilter={handleFilter} />
      <PersonForm 
        handleSubmit={handleSubmit}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Persons persons={persons} filter={filter} handleDelete={handleDelete} />
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

const Persons = ({ persons, filter, handleDelete }) => {
  return (
    <ul>
      { 
        (filter === '') 
        ? persons.map( person => 
            <li key={person.name}>
                {person.name} {person.number}
                <button onClick={() => handleDelete(person.name)}>delete</button>
            </li>) 
        : persons.map( person => person.name.toLowerCase().includes(filter.toLowerCase()) ? <li key={person.name}>{person.name} {person.number}</li> : null)
      }
      </ul>
  )
}

const Filter = ({ handleFilter}) => <div>filter shown with <input onChange={handleFilter}/></div>

export default App