import personService from '../Services/Persons'
const Persons = ({persons, setPersons}) => {
  const onDeleteHandler = person => {
    if(window.confirm("Do you really want to delete?")){
      personService
        .remove(person.id)
        .then(() => {
          setPersons(persons.filter( p => p.id !== person.id))
        })
        .catch(error => {
          alert(`${person.name} is already deleted`)
        })
    }
  }
    return (
        <div>
        {persons.map(person => <p key={person.id}>{person.name} {person.number} <button onClick={() => {onDeleteHandler(person)}}>delete</button></p>)}
      </div>
    )
}
export default Persons