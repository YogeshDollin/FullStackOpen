import { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'

const DEFAULT_PAGE = 'books'

const App = () => {
  const [page, setPage] = useState('books')
  const [token, setToken] = useState('')

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {
          token ? 
            <>
              <button onClick={() => setPage('add')}>add book</button>
              <button onClick={() => {
                localStorage.clear()
                setToken('')
                setPage('login')
              }}>logout</button>
            </>
            : <button onClick={() => setPage('login')}>login</button>
        }
      </div>

      <Authors show={page === 'authors'} />

      <Books show={page === 'books'} />

      <NewBook show={page === 'add'} />

      <LoginForm show={page === 'login'} setToken={setToken} setDefaultPage={() => setPage(DEFAULT_PAGE)}/>
    </div>
  )
}

export default App
