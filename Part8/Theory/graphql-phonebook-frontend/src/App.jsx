import { useApolloClient, useQuery } from '@apollo/client'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import {ALL_PERSONS} from "./components/Queries"
import { useState } from 'react'
import Notify from './components/Notify'
import PhoneForm from './components/PhoneForm'
import LoginForm from './components/LoginForm'

function App() {
  const [errorMessage, setErrorMessage] = useState(null)
  const [token, setToken] = useState('')
  const result = useQuery(ALL_PERSONS)
  const client = useApolloClient()

  if(result.loading){
    return <div>loading...</div>
  }

  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000);
  }

  const logout = e => {
    e.preventDefault()
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  if(!token){
    return (
      <div>
        <Notify message={errorMessage} isError={true}/>
        <h2>Login</h2>
        <LoginForm setToken={setToken} setError={notify}/>
      </div>
    )
  }

  return (
    <>
      <div>
        <Notify message={errorMessage} isError={true}/>
        <button onClick={logout}>logout</button>
        <Persons persons={result.data.allPersons}/>
        <PersonForm setError={notify}/>
        <PhoneForm setError={notify}/>
      </div>
    </>
  )
}

export default App
