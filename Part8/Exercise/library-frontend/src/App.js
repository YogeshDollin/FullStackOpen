import { useEffect, useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import Recommend from './components/recommend'
import { useSubscription } from '@apollo/client'
import { ALL_BOOKS, BOOK_ADDED } from './components/Queries'

const DEFAULT_PAGE = 'authors'

const App = () => {
  const [page, setPage] = useState('books')
  const [token, setToken] = useState('')

  useEffect(() => {
    const token = localStorage.getItem('library-user-token')
    setToken(token)
  }, [])

  useSubscription(BOOK_ADDED, {
    onData: ({data, client}) => {
      console.log(data);
      alert(`'${data.data.bookAdded.title}' added in library`)
      client.cache.updateQuery({query: ALL_BOOKS, variables: {genre: ''}}, ({allBooks}) => {
        return {
          allBooks: allBooks.concat(data.data.bookAdded)
        }
      })
    }
  })

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {
          token ? 
            <>
              <button onClick={() => setPage('add')}>add book</button>
              <button onClick={() => setPage('recommend')}>recommend</button>
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

      <Recommend show={page === 'recommend'}/>
    </div>
  )
}

export default App
