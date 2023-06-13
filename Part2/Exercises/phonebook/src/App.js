import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filteredName, setFilteredName] = useState('')


  const addNewName = (event) =>{
    event.preventDefault();
    if (persons.find(person => person.name === newName)){
      alert(`${newName} is already added in phonebook`)
    }else{
      const personObject = {name: newName, number: newNumber}
      setPersons(persons.concat([personObject]))
      setNewName('')
      setNewNumber('')
    }
  }

  const handleOnNameChange = (event) => {
    console.log(event.target.value);
    setNewName(event.target.value)
  }

  const handleOnNumberChange = (event) => {
    setNewNumber(event.target.value)
  }
  const handleOnFilteredNameChange = (event) => {
    setFilteredName(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        <p>filter shown with <input value={filteredName} onChange={handleOnFilteredNameChange}/></p>
        {persons.filter(person => person.name.includes(filteredName)).map(person => <p key={person.id}>{person.name}</p>)}
      </div>
      <form onSubmit={addNewName}>
        <div>
          name: <input value={newName} onChange={handleOnNameChange}/>
        </div>
        <div>
          number: <input value={newNumber} onChange={handleOnNumberChange}/>
        </div>
        <div>
          <button type="submit" >add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        {persons.map(person => <p key={person.id}>{person.name} {person.number}</p>)}
      </div>
    </div>
  )
}

export default App