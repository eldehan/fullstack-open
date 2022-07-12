import { useState } from 'react'
import Persons from './components/Persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  
  const [newFilter, setFilter] = useState('')

  const handleFilterInput = (event) => {
    setFilter(event.target.value)
  }

  const resultsToShow = newFilter
    ? persons.filter(person => {
      let filterRegex = new RegExp(newFilter, 'i')
      return filterRegex.test(person.name)
    })
    : persons

  const handleNameInput = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberInput = (event) => {
    setNewNumber(event.target.value)
  }

  const addPerson = (event) => {
    event.preventDefault()

    if (persons.filter(person => person.name === newName).length > 0) {
      alert(`${newName} is already added to phonebook`)
    } else {
      const personObject = {
        name: newName,
        number: newNumber,
      }

      setPersons(persons.concat(personObject))
      setNewName('')
      setNewNumber('')
    }
  }

  return (
    <>
      <h2>Phonebook</h2>
      <Filter 
        newFilter={newFilter}
        handleFilterInput={handleFilterInput}
      />
      <h2>Add a new contact</h2>
      <PersonForm 
        addPerson={addPerson} 
        newName={newName} 
        handleNameInput={handleNameInput} 
        newNumber={newNumber} 
        handleNumberInput={handleNumberInput}
      />
      <h2>Numbers</h2>
      <Persons resultsToShow={resultsToShow}/>
    </>
  )
}

export default App