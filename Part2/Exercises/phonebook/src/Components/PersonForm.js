import { useState } from 'react'

const PersonForm = ({persons, setPersons}) => {
    const [newName, setNewName] = useState('')  
    const [newNumber, setNewNumber] = useState('')

    const handleOnNameChange = (event) => {
        setNewName(event.target.value)
    }
    
    const handleOnNumberChange = (event) => {
        setNewNumber(event.target.value)
    }

    const addNewName = (event) =>{
        event.preventDefault();
        if (persons.find(person => person.name === newName)){
          alert(`${newName} is already added in phonebook`)
        }else{
          const personObject = {name: newName, number: newNumber, id: persons.length + 1}
          setPersons(persons.concat([personObject]))
          setNewName('')
          setNewNumber('')
        }
    }

    return (
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
    )
}

export default PersonForm
