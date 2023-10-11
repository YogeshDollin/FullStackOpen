import { useDispatch } from "react-redux"
import { createAnecdote } from "../reducers/anecdoteReducer"
import { removeNotification, updateNotificationMessage } from "../reducers/notificationReducer"

const AnecdoteForm = () => {

    const dispatch = useDispatch()

    const handleSubmit = event => {
        event.preventDefault()
        const value = event.target.anecdote.value
        dispatch(createAnecdote(value))
        event.target.anecdote.value = ''
        dispatch(updateNotificationMessage(`created '${value}' anecdote`))
        setTimeout(() => {
            dispatch(removeNotification())
        }, 5000);
    }

    return (
        <>
            <h2>create new</h2>
            <form onSubmit={handleSubmit}>
                <input name="anecdote"/>
                <button type="submit">create</button>
            </form>
        </>
    )
}

export default AnecdoteForm