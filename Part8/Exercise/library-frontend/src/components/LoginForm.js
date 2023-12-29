import { useMutation } from "@apollo/client"
import { useEffect, useState } from "react"
import { LOGIN } from "./Queries"

const LoginForm = ({show, setToken, setDefaultPage}) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const [login, result] = useMutation(LOGIN, {
        onError: error => {
            console.log(error)
        }
    })

    useEffect(() => {
        if(result.data){
            const token = result.data.login.value
            localStorage.setItem('library-user-token', token)
            setToken(token)
        }
    }, [result.data])

    if(!show){
        return null
    }

    const submit = e => {
        e.preventDefault()
        login({variables: {username, password}})
        setDefaultPage()
    }

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={submit}>
                <div>
                    username <input type="text" value={username} onChange={({target}) => setUsername(target.value)}></input>
                </div>
                <div>
                    password <input type="password" value={password} onChange={({target}) => setPassword(target.value)}></input>
                </div>
                <button type="submit">login</button>
            </form>
        </div>
    )
}

export default LoginForm