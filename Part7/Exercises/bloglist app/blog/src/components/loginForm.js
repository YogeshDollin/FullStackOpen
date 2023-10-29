import { useState } from 'react'
import loginService from '../services/login'
import blogService from '../services/blogs'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { resetErrorMessage, setErrorMessage } from '../store/errorMessageReducer'

const LoginForm = ({setUser}) => {
    const dispatch = useDispatch()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const errorMessage= useSelector(state => state.errorMessage)

    const handleLogin = async (evt) => {
        evt.preventDefault()
        try {
            const user = await loginService.login({username, password})
            localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
            setUser(user)
            blogService.setToken(user.token)
            setUsername('')
            setPassword('')
        } catch (error) {
            dispatch(setErrorMessage('Wrong credentials'))
            setTimeout(() => {
                dispatch(resetErrorMessage())
            }, 3000)
        }
    }
    return (
        <form onSubmit={handleLogin}>
            <h2>log in to application</h2>
            {errorMessage ? <p id='errorMessage'>{errorMessage}</p> : ''}
            <div>
                username
                <input type='text' id='username' name='username' value={username} onChange={({target}) => {setUsername(target.value)}}/>
            </div>
            <div>
                password
                <input type='password' id='password' name='password' value={password} onChange={({target}) => {setPassword(target.value)}}/>
            </div>
            <button id='login-submit' type='submit'>login</button>
        </form>
    )
}

LoginForm.propTypes = {
    setUser: PropTypes.func.isRequired
}

export default LoginForm