import { useQuery } from "@apollo/client"
import {ALL_BOOKS} from './Queries'
import { useState } from "react"

const Books = (props) => {
  const result = useQuery(ALL_BOOKS)
  const [selctedGenre, setSeclectedGenre] = useState('')
  if (!props.show) {
    return null
  }

  if(result.loading){
    return <div>Loading Books ...</div>
  }

  const books = result.data.allBooks.filter(book => selctedGenre ? book.genres.includes(selctedGenre) : true)

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
      </div>
        <button onClick={() => setSeclectedGenre('refactoring')}>refactoring</button>
        <button onClick={() => setSeclectedGenre('agile')}>agile</button>
        <button onClick={() => setSeclectedGenre('patterns')}>patterns</button>
        <button onClick={() => setSeclectedGenre('design')}>design</button>
        <button onClick={() => setSeclectedGenre('crime')}>crime</button>
        <button onClick={() => setSeclectedGenre('classic')}>classic</button>
        <button onClick={() => setSeclectedGenre('')}>All genres</button>
      </div>
  )
}

export default Books
