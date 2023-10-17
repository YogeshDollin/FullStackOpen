import { useDispatch } from "react-redux"
import { createAnecdote } from "../reducers/anecdoteReducer"
import {setNotification} from "../reducers/notificationReducer"

const AnecdoteForm = () => {

    const dispatch = useDispatch()

    const handleSubmit = async event => {
        event.preventDefault()
        const value = event.target.anecdote.value

        try {
            dispatch(createAnecdote(value))
            event.target.anecdote.value = ''
            dispatch(setNotification(`new anecdote '${value}' anecdote`, 5))
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