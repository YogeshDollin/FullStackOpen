import { useMutation, useQuery } from "@apollo/client"
import { ALL_AUTHORS, EDIT_AUTHOR } from "./Queries"
import { useState } from "react"

const Authors = (props) => {
  const result = useQuery(ALL_AUTHORS)
  const [selectedAuthor, setSelectedAuthor] = useState('')
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

  const authors = result.data ? result.data.allAuthors : []

  const submit = e => {
    e.preventDefault()

    console.log(selectedAuthor)
    console.log(updateBorn);

    editAuthor({variables: {name: selectedAuthor, born: Number(updateBorn)}})

    console.log('update author...')
    setSelectedAuthor('')
    setUpdateBorn('')
  }

  const onSelectedAuthorHandler = e => {
    setSelectedAuthor(e.target.value)
    const findAuthor = authors.find(auth => auth.name === e.target.value)
    setUpdateBorn(findAuthor.born)
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
          <div>
            <select value={selectedAuthor} onChange={onSelectedAuthorHandler}>
              <option value=''>Select</option>
              {authors.map(author => <option value={author.name}>{author.name}</option>)}
            </select>
          </div>
          <div>born <input type="text" name="born" value={updateBorn} onChange={({target}) => setUpdateBorn(target.value)}></input></div>
          <button type="submit">update author</button>
      </form>
    </div>
  )
}

export default Authors
