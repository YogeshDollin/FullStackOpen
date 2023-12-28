import { useMutation } from "@apollo/client"
import { useEffect, useState } from "react"
import { LOGIN } from "./Queries"

const LoginForm = ({setToken, setError}) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const [login, result] = useMutation(LOGIN, {
        onError: (error) => {
            setError(error.graphQLErrors[0].message)
        }
    })

    useEffect(()=> {
        if(result.data){
            const token = result.data.login.value
            setToken(token)
            localStorage.setItem('phonenumbers-user-token', token)
        }
    }, [result.data])

    const submit = e => {
        e.preventDefault()
        login({variables: {username, password}})
    }

    return (
        <div>
            <form onSubmit={submit}>
                <div>
                    username <input type="text" id="username" value={username} onChange={({target}) => setUsername(target.value)} ></input>
                </div>
                <div>
                    password <input type="password" id="password" value={password} onChange={({target}) => setPassword(target.value)}></input>
                </div>
                <button type="submit">login</button>
            </form>
        </div>
    )
}

export default LoginForm