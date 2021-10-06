import axios from 'axios'
import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/persons'


const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [filterName, setFilterName ] = useState('')

  useEffect(() => {
    personService.getAll()
    .then((personsList)=>{
      setPersons(personsList)
    }) 
  }, [])


  const personsToShow = filterName === '' 
  ? persons
  : persons.filter(person => person.name.toUpperCase().includes(filterName.toUpperCase()))

  const addName = (event) =>{
    event.preventDefault()
    const personToBeSearched = persons.find((person)=>person.name === newName)
    if(personToBeSearched === undefined ){
      const newPerson = {
        name: newName,
        number: newNumber
      }

      personService.create(newPerson)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
      })
    }
    else{
      const result = window.confirm(`${personToBeSearched.name} is already added to phonebook, replace the old number with a new one?`)
      if (result){
        const updatedPerson = {...personToBeSearched, number: newNumber}
        personService.update(updatedPerson)
        .then(returnedPerson => {
          setPersons(persons.map(person => person.id !== returnedPerson.id ? person : returnedPerson))
        })
      }
    }
    setNewName('')
    setNewNumber('')
  }

  const deletePerson = personId => {
    personService.deletePerson(personId)
    .then(returnedPerson => {
      const result = window.confirm(`Delete ${persons.find(person => person.id === personId).name}?`)
      if (result)
        setPersons(persons.filter(person => person.id !== personId))
    })
  }

  const handleNameChange = (event) => setNewName(event.target.value)

  const handleNumberChange = (event) => setNewNumber(event.target.value)

  const handleFilterChange = (event) => setFilterName(event.target.value)
  
  

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter handleFilterChange={handleFilterChange} filterName={filterName} />

      <h3>add a new</h3>

      <PersonForm handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} newNumber={newNumber} newName={newName} addName={addName} />
      
      <h3>Numbers</h3>

      <Persons personsToShow={personsToShow} deletePerson={deletePerson} />
    </div>
  )
}

export default App