import { useState } from "react"

const DoesInclude = (personName, filterName) => {
    const regex = new RegExp(filterName, "i")
    return regex.test(personName)
}

const Filter = ({persons}) =>{
    const [filterName, setFilterName] = useState('')
    const handleOnFilterNameChange = (event) => {
        setFilterName(event.target.value)
    }
    return (
        <div>
            <p>filter shown with <input value={filterName} onChange={handleOnFilterNameChange}/></p>
            {persons.filter(person => DoesInclude(person.name, filterName)).map(person => <p key={person.id}>{person.name}</p>)}
        </div>
    )
}

export default Filter