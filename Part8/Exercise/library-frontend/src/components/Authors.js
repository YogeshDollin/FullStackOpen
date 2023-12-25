import { useMutation, useQuery } from "@apollo/client"
import { ALL_AUTHORS, EDIT_AUTHOR } from "./Queries"
import { useState } from "react"

const Authors = (props) => {
  const result = useQuery(ALL_AUTHORS)
  const [updateAuthor, setUpdateAuthor] = useState('')
  const [updateBorn, setUpdateBorn] = useState('')

  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{query: ALL_AUTHORS}]
  })
  

  if (!props.show) {
    return null
  }

  if(result.loading){
    return <div>Loading authors ...</div>
  }

  const authors = result.data.allAuthors

  const submit = e => {
    e.preventDefault()

    console.log(updateAuthor)
    console.log(updateBorn);

    editAuthor({variables: {name: updateAuthor, born: Number(updateBorn)}})

    console.log('update author...')
    setUpdateAuthor('')
    setUpdateBorn('')
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <br/>
      <h2>Set birthyear</h2>
      <form onSubmit={submit}>
          <div>name <input type="text" name="name" value={updateAuthor} onChange={({target}) => setUpdateAuthor(target.value) }></input></div>
          <div>born <input type="text" name="born" value={updateBorn} onChange={({target}) => setUpdateBorn(target.value)}></input></div>
          <button type="submit">update author</button>
      </form>
    </div>
  )
}

export default Authors
