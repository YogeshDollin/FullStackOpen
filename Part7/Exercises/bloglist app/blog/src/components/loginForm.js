import { useContext, useReducer, useState } from 'react'
import loginService from '../services/login'
import blogService from '../services/blogs'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import AppContext from '../context/appContext'
import Notification from './Notification'
import { resetNotificationAction, setNotificationAction } from '../store/notificationReducer'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Alert from 'react-bootstrap/Alert'

const LoginForm = ({setUser}) => {
    const dispatch = useDispatch()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [notification, notificationDispatch] = useContext(AppContext)
    const handleLogin = async (evt) => {
        evt.preventDefault()
        try {
            const user = await loginService.login({username, password})
            localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
            dispatch(setUser(user))
            blogService.setToken(user.token)
            setUsername('')
            setPassword('')
        } catch (error) {
            notificationDispatch(setNotificationAction({type: 'error', message: 'Wrong credentials'}))
            setTimeout(() => {
                notificationDispatch(resetNotificationAction())
            }, 3000)
        }
    }
    return (
        <div className='container'>
            <h2>log in to application</h2>
            <Notification variant='danger' message={notification.message}/>
            <Form onSubmit={handleLogin}>
                <Form.Group>
                    <Form.Label>Username</Form.Label>
                    <Form.Control type='text' id='username' name='username' value={username} onChange={({target}) => {setUsername(target.value)}}/>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Password</Form.Label>
                    <Form.Control type='password' id='password' name='password' value={password} onChange={({target}) => {setPassword(target.value)}}/>
                </Form.Group>
            <Button variant='primary' id='login-submit' type='submit'>Login</Button>
        </Form>
        </div>
    )
}

LoginForm.propTypes = {
    setUser: PropTypes.func.isRequired
}

export default LoginForm