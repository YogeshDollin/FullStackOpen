import { useEffect, useState } from 'react'
import personService from './Services/Persons'
import Filter from './Components/Filter'
import PersonForm from './Components/PersonForm'
import Persons from './Components/Persons'
import Notification from './Components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [successMessage, setSuccessMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  useEffect(() =>{
    personService.getAll()
                  .then(personsObject => {
                    setPersons(personsObject)
                  })
  }, [])
  
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={successMessage} className="success"/>
      <Notification message={errorMessage} className="error"/>
      <Filter persons={persons}/>
      <PersonForm persons={persons} setPersons={setPersons} setSuccessMessage={setSuccessMessage} setErrorMessage={setErrorMessage}/>
      <h2>Numbers</h2>
      <Persons persons={persons} setPersons={setPersons}/>
    </div>
  )
}

export default App