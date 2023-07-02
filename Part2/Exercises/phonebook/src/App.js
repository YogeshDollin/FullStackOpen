import { useEffect, useState } from 'react'
import personService from './Services/Persons'
import Filter from './Components/Filter'
import PersonForm from './Components/PersonForm'
import Persons from './Components/Persons'

const App = () => {
  const [persons, setPersons] = useState([]) 
  useEffect(() =>{
    personService.getAll()
                  .then(personsObject => {
                    setPersons(personsObject)
                  })
  }, [])
  
  return (
    <div>
      <h2>Phonebook</h2>
      <Filter persons={persons}/>
      <PersonForm persons={persons} setPersons={setPersons}/>
      <h2>Numbers</h2>
      <Persons persons={persons} setPersons={setPersons}/>
    </div>
  )
}

export default App