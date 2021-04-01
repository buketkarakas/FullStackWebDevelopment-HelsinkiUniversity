import axios from 'axios'
import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [filterName, setFilterName ] = useState('')

  useEffect(() => {
    axios
    .get('http://localhost:3001/persons')
    .then((response)=>{
      setPersons(response.data)
    })
    
  }, [])


  const personsToShow = filterName === '' 
  ? persons
  : persons.filter(person => person.name.toUpperCase().includes(filterName.toUpperCase()))

  const addName = (event) =>{
    event.preventDefault()
    if(persons.find((person)=>person.name === newName) === undefined ){
      setPersons(persons.concat({ name: newName, number: newNumber }))
    }
    else{
      const message =`${newName} is already added to phonebook`
      window.alert(message)
    }
    setNewName('')
    setNewNumber('')
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

      <Persons personsToShow={personsToShow} />
    </div>
  )
}

export default App