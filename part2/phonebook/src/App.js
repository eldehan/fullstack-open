import { useState, useEffect } from 'react'

import contactService from './services/contacts'

import Persons from './components/Persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setFilter] = useState('')

  useEffect(() => {
    contactService
      .getAll()
      .then((initialContacts) => {
        setPersons(initialContacts)
      })
  }, [])

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

  const handleDeleteButton = (event) => {
    const nameToDelete = event.target.closest('p').childNodes[0].textContent
    const personToDelete = persons.filter(person => {
      return (person.name === nameToDelete)
    })[0]

    const id = personToDelete.id

    if (window.confirm(`Delete ${nameToDelete}?`)) {
      deletePerson(id)
    }
  }
  
  const deletePerson = (id) => {
    contactService
      .destroy(id)
      .then(() => {
        setPersons(persons.filter(n => n.id !== id))})
      .catch((error) => alert('An error occurred attempting to delete the contact'))
  }

  const addPerson = (event) => {
    event.preventDefault()

    const personObject = {
      name: newName,
      number: newNumber,
    }

    if (persons.filter(person => person.name === newName).length > 0) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const id = persons.filter(person => {
          return (person.name === newName)
        })[0].id
        
        contactService
          .update(id, personObject)
          .then((returnedPerson) => {
            setPersons(persons.map((person) => (person.id !== id ? person : returnedPerson)));
          })
      }
    } else {
      contactService
        .create(personObject)
        .then((returnedContact) => {
          setPersons(persons.concat(returnedContact))
          setNewName('')
          setNewNumber('')
        })
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
      <Persons resultsToShow={resultsToShow} handleDeleteButton={handleDeleteButton}/>
    </>
  )
}

export default App