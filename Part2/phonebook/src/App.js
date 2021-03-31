import React, { useState } from 'react'

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [filterName, setFilterName ] = useState('')

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

  const handleFilterChange = (event) => {
    setFilterName(event.target.value)
  }
  

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        filter shown with <input value={filterName} onChange={handleFilterChange}/>
      </div>
      <h2>add a new</h2>
      <form onSubmit={addName}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {personsToShow.map((person) => <li key={person.name} >{person.name} {person.number}</li>)}
      </ul>
    </div>
  )
}

export default App