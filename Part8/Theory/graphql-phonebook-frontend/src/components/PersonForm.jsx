import { useMutation } from "@apollo/client"
import { useState } from "react"
import {CREATE_PERSON, ALL_PERSONS} from './Queries'
import { updateCache } from "../App"

const PersonForm = ({setError}) => {
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [street, setStreet] = useState('')
    const [city, setCity] = useState('')

    const [createPerson] = useMutation(CREATE_PERSON, {
        onError: error => {
            const message = error.graphQLErrors.map(e => e.message).join('\n')
            setError(message)
        },
        update: (cache, response) => {
            updateCache(cache, {query: ALL_PERSONS}, response.data.addPerson)
        }
    })

    const submit = e => {
        e.preventDefault()
        createPerson({variables: {name, phone: phone.length > 0 ? phone : undefined, street, city}})
        console.log(e)
        setName('')
        setPhone('')
        setCity('')
        setStreet('')
    }

    return (
        <div>
            <h2>Create new</h2>
            <form onSubmit={submit}>
                <div>
                    Name <input type="text" onChange={({target}) => setName(target.value)} value={name}/>
                </div>
                <div>
                    phone <input type="text" onChange={({target}) => setPhone(target.value)} value={phone}/>
                </div>
                <div>
                    street <input type="text" onChange={({target}) => setStreet(target.value)} value={street}/>
                </div>
                <div>
                    city   <input type="text" onChange={({target}) => setCity(target.value)} value={city}/>
                </div>
                <button type="submit">create</button>
            </form>
        </div>
    )
}

export default PersonForm