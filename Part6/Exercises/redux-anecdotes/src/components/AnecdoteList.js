import { useDispatch, useSelector } from "react-redux"
import { voteAction } from "../reducers/anecdoteReducer"

const AnecdoteList = () => {

    const anecdotes = useSelector(state => {
      const sortedAnecdotes = state.anecdotes.sort((anecdote1, anecdote2) => anecdote1.votes < anecdote2.votes)
      return state.filter === ''
      ? sortedAnecdotes
      : sortedAnecdotes.filter(anecdote => anecdote.content.includes(state.filter))
    })
    const dispatch = useDispatch()

    const vote = (id) => {
        dispatch(voteAction(id))
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
                <button onClick={() => vote(anecdote.id)}>vote</button>
              </div>
            </div>
            )}
        </>
    )
}

export default AnecdoteList