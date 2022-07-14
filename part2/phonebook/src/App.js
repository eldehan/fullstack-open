import { useState, useEffect } from 'react'

import contactService from './services/contacts'

import Persons from './components/Persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setFilter] = useState('')
  const [notification, setNotification] = useState(null)

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

    if (window.confirm(`Delete ${nameToDelete}?`)) {
      deletePerson(personToDelete)
    }
  }
  
  const deletePerson = (personToDelete) => {
    const id = personToDelete.id
    const name = personToDelete.name

    contactService
      .destroy(id)
      .then(() => {
        setPersons(persons.filter(n => n.id !== id))
        setNotification(`Information of ${name} has been removed from the server`)
        setTimeout(() => {
          setNotification(null)
        }, 4000)})
      .catch((error) => {
        setNotification(`Error: Information of ${name} has already been removed from the server`)
        setTimeout(() => {
          setNotification(null)
        }, 4000)
      })
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
          setNotification(`Added ${newName}`)
          setTimeout(() => {
            setNotification(null)
          }, 4000)
          setNewName('')
          setNewNumber('')
        })
    }
  }

  return (
    <>
      <h2>Phonebook</h2>
      <Notification message={notification} />
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