import { useDispatch, useSelector } from "react-redux"
import { voteAnecdote, initializeAnecdotes } from "../reducers/anecdoteReducer"
import { removeNotification, updateNotificationMessage } from "../reducers/notificationReducer"
import { useEffect } from "react"

const AnecdoteList = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeAnecdotes())
  }, [])

  const anecdotes = useSelector(state => {
    const sortedAnecdotes = [...state.anecdotes].sort((anecdote1, anecdote2) => anecdote1.votes < anecdote2.votes)
    return state.filter === ''
    ? sortedAnecdotes
    : sortedAnecdotes.filter(anecdote => anecdote.content.includes(state.filter))
  })

  const vote = (anecdote) => {
      dispatch(voteAnecdote(anecdote))
  }
  return (
      <>
          {anecdotes.map(anecdote =>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={() => {
                vote(anecdote)
                dispatch(updateNotificationMessage(`you voted '${anecdote.content}'`))
                setTimeout(() => {
                  dispatch(removeNotification())
                }, 5000);
              }}>vote</button>
            </div>
          </div>
          )}
      </>
  )
}

export default AnecdoteList