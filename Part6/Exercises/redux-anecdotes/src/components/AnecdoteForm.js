import { useDispatch } from "react-redux"
import { createAnecdote } from "../reducers/anecdoteReducer"
import { removeNotification, updateNotificationMessage } from "../reducers/notificationReducer"
import anecdotesService from "../services/anecdotesService"

const AnecdoteForm = () => {

    const dispatch = useDispatch()

    const handleSubmit = async event => {
        event.preventDefault()
        const value = event.target.anecdote.value

        try {
            const anecdote = await anecdotesService.createNew(value)

            dispatch(createAnecdote(anecdote))
            event.target.anecdote.value = ''
            dispatch(updateNotificationMessage(`created '${value}' anecdote`))
            setTimeout(() => {
                dispatch(removeNotification())
            }, 5000);
        } catch (error) {
            console.log(error)
        }
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