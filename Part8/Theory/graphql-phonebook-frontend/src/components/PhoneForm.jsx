import { useEffect, useState } from "react"
import { EDIT_NUMBER } from "./Queries"
import { useMutation } from "@apollo/client"

const PhoneForm = ({setError}) => {
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')

    const [editNumber, result] = useMutation(EDIT_NUMBER)

    const submit = e => {
        e.preventDefault()
        editNumber({variables: {name, phone}})
        setName('')
        setPhone('')
    }

    useEffect(() => {
        if(result.data && result.data.editNumber === null){
            setError('person not found')
        }
    }, [result.data])

    return (
        <div>
            <h2>Update number</h2>
            <form onSubmit={submit}>
                <div>
                    Name <input type="text" value={name} onChange={({target}) => setName(target.value)}/>
                </div>
                <div>
                    phone <input type="text" value={phone} onChange={({target}) => setPhone(target.value)}/>
                </div>
                <button type="submit">Change number</button>
            </form>
        </div>
    )
}

export default PhoneForm