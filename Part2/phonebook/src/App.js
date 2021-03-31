import React, { useState } from 'react'

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [ newName, setNewName ] = useState('')

  const addName = (event) =>{
    event.preventDefault()
    if(persons.find((person)=>person.name === newName) === undefined ){
      setPersons(persons.concat({ name: newName }))
    }
    else{
      const message =`${newName} is already added to phonebook`
      window.alert(message)
    }
    setNewName('')
  }

  const handleNameChange = (event) => setNewName(event.target.value)
  

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.map((person) => <li key={person.name} >{person.name}</li>)}
      </ul>
    </div>
  )
}

export default App