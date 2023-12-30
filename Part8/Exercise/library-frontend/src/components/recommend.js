import { useQuery } from "@apollo/client"
import { ALL_BOOKS, ME } from "./Queries"

const Recommend = ({show}) => {
    const userResult = useQuery(ME)

    const favGenreBooksResult = useQuery(ALL_BOOKS, {
        variables: {genre: userResult.data ? userResult.data.me.favoriteGenre : ''}
    })

    if(!show) return null

    if(favGenreBooksResult.loading) return <div>loading...</div>
    const user = userResult.data ? userResult.data.me : null
    const books = favGenreBooksResult.data.allBooks

    return (
        <div>
            <h2>recommendations</h2>
            <br></br>
            <br></br>
            <p>books in your favorite genre <strong>{user.favoriteGenre}</strong></p>
            <br></br>
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
        </div>
    )
}

export default Recommend