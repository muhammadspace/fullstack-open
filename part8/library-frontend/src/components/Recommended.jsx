import { useQuery } from "@apollo/client"
import { ALL_BOOKS, ME } from "../queries"

const Recommended = () => {
    const userQuery = useQuery(ME)
    const booksQuery = useQuery(ALL_BOOKS)

    const user = userQuery.data?.me
    const books = booksQuery.data?.allBooks?.filter((book => book.genres.includes(user?.favoriteGenre)))

    if (userQuery.loading || booksQuery.loading)
        return <h3>loading...</h3>

    return (
        <div>
            <h1>recommended books</h1>
            <p>books based on your favorite genre <b>{ user?.favoriteGenre }</b></p>
            <table>
                <tbody>
                    <tr>
                        <th></th>
                        <th>author</th>
                        <th>published</th>
                    </tr>
                    {books?.map((a) => (
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

export default Recommended