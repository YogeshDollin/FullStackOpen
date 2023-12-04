import { useQuery } from '@apollo/client'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import {ALL_PERSONS} from "./components/Queries"
import { useState } from 'react'
import Notify from './components/Notify'
import PhoneForm from './components/PhoneForm'

function App() {
  const result = useQuery(ALL_PERSONS)
  const [errorMessage, setErrorMessage] = useState(null)

  if(result.loading){
    return <div>loading...</div>
  }

  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000);
  }

  return (
    <>
      <div>
        <Notify message={errorMessage} isError={true}/>
        <Persons persons={result.data.allPersons}/>
        <PersonForm setError={notify}/>
        <PhoneForm setError={notify}/>
      </div>
    </>
  )
}

export default App
