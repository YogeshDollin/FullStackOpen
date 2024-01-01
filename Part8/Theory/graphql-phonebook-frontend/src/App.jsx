import { useApolloClient, useQuery, useSubscription } from '@apollo/client'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import {ALL_PERSONS, PERSON_ADDED} from "./components/Queries"
import { useState } from 'react'
import Notify from './components/Notify'
import PhoneForm from './components/PhoneForm'
import LoginForm from './components/LoginForm'

export const updateCache = (cache, query, addedPerson) => {
  const uniqueByName = arr => {
    const seen = new Set()
    return arr.filter(item => seen.has(item.name) ? false : seen.add(item.name))
  }
  cache.updateQuery(query, ({allPersons}) => {
    return {
      allPersons: uniqueByName(allPersons.concat(addedPerson))
    }
  })
}

function App() {
  const [errorMessage, setErrorMessage] = useState(null)
  const [token, setToken] = useState('')
  const result = useQuery(ALL_PERSONS)
  const client = useApolloClient()

  useSubscription(PERSON_ADDED, {
    onData: ({data, client}) => {
      console.log(data)
      const addedPerson = data.data.personAdded
      notify(`${addedPerson.name} added`)
      updateCache(client.cache, {query: ALL_PERSONS}, addedPerson)
    }
  })

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
