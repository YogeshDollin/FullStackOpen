import { useState } from "react"
import loginService from '../services/login'
import blogService from '../services/blogs'

const LoginForm = ({setUser}) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [errorMessage, setErrorMessage] = useState('')

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
            setErrorMessage('Wrong credentials')
            setTimeout(() => {
                setErrorMessage('')
            }, 3000);
        }
    }
    
    return (
        <form onSubmit={handleLogin}>
            <h2>log in to application</h2>
            {errorMessage ? <p id="errorMessage">{errorMessage}</p> : ''}
            <div>
                username
                <input type="text" name="username" value={username} onChange={({target}) => {setUsername(target.value)}}/>
            </div>
            <div>
                password
                <input type="password" name="password" value={password} onChange={({target}) => {setPassword(target.value)}}/>
            </div>
            <button type="submit">login</button>
        </form>
    )
}

export default LoginForm