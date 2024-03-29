import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {getAll, update} from './request'
import { useNotificationDispatch } from './NotificationContext'

const App = () => {
  const queryClient = useQueryClient()
  const voteMutation = useMutation({
    mutationFn: update,
    onSuccess: (updatedAnecdote) => {
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(['anecdotes'], anecdotes.map(anecdote => anecdote.id === updatedAnecdote.id ? updatedAnecdote : anecdote))
    }
  })
  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAll,
    retry: false
  })
  
  const dispatch = useNotificationDispatch()

  const handleVote = (anecdote) => {
    const updatedAnecdote = {...anecdote, votes: anecdote.votes + 1}
    voteMutation.mutate(updatedAnecdote)
    dispatch({type: 'VOTE', payload: updatedAnecdote})
    setTimeout(() => {
      dispatch({type: 'RESET'})
    }, 5000);
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
