import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useQuery } from '@tanstack/react-query'
import {getAll} from './request'

const App = () => {

  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAll,
    retry: false
  })

  const handleVote = (anecdote) => {
    console.log('vote')
  }

  if(result.isError){
    return <p>anecdote service not available due to problem in server</p>
  }


  const anecdotes = result.data ? result.data : []

  return (
    <div>
      <h3>Anecdote app</h3>
    
      <Notification />
      <AnecdoteForm />
    
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
