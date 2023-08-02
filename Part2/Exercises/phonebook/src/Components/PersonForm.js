import personService from '../Services/Persons'
import { useState } from 'react'

const PersonForm = ({persons, setPersons, setSuccessMessage, setErrorMessage}) => {
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
        const person = persons.find(person => person.name === newName)
        const newPerson = {name: newName, number: newNumber}
        if (person){
          if(window.confirm(`${newName} is already added in phonebook, replace the old number with a new one?`)){
            personService
              .update(person.id, newPerson)
              .then(personObject => {
                setPersons(persons.map(p => p.id === person.id ? {...person, ...personObject} : p))
              })
              .catch(error => {
                setErrorMessage(error.response.data.error.message)
                setInterval(() => {
                  setErrorMessage(null)
                }, 5000)
                setPersons(persons.filter(p => p.id !== person.id))
              })
          }
        }else{
          personService
            .create(newPerson)
            .then(personObject => {
              setPersons(persons.concat(personObject))
              setSuccessMessage(`Added ${personObject.name}`)
              setInterval(() => {
                setSuccessMessage(null)
              }, 5000)
              setNewName('')
              setNewNumber('')
            })
            .catch(error => {
              setErrorMessage(error.response.data.error.message)
              setInterval(() => {
                setErrorMessage(null)
              }, 5000)
            })
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
