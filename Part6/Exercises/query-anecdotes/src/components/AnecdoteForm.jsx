import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createNew } from "../request"
import { useNotificationDispatch } from "../NotificationContext"

const AnecdoteForm = () => {
  const queryClient = useQueryClient()
  const newAnecdoteMutation = useMutation({
    mutationFn: createNew,
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(['anecdotes'], anecdotes.concat(newAnecdote))
      dispatch({type: 'CREATE', payload: newAnecdote})
      setTimeout(() => {
        dispatch({type: 'RESET'})
      }, 5000);
    },
    onError: (err) => {
      dispatch({type: 'ERROR', payload: err.response.data.error})
      setTimeout(() => {
        dispatch({type: 'RESET'})
      }, 5000);
    }
  })

  const dispatch = useNotificationDispatch()

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    const newAnecdote = {content, votes: 0}
    newAnecdoteMutation.mutate(newAnecdote)
    event.target.anecdote.value = ''
    console.log('new anecdote')
}

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
