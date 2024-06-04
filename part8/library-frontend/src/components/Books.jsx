import { useQuery, useApolloClient } from "@apollo/client"
import { ALL_BOOKS } from "../queries"
import { useState } from "react"
import { useEffect } from "react"

const Books = () => {
    const client = useApolloClient()
    const [genres, setGenres] = useState([])
    const [filter, setFilter] = useState(null)
    const allBooksQuery = useQuery(ALL_BOOKS, {
        variables: filter ? { genre: filter } : null
    })

    const books = allBooksQuery.data?.allBooks

    useEffect(() => {
        if (!books) return

        const filteredGenres = allBooksQuery.data.allBooks.reduce((prevGenres, book) => {
            book.genres.forEach(genre => {
                if (!prevGenres.includes(genre))
                    prevGenres.push(genre)
            })

            return prevGenres
        }, [])

        setGenres(filteredGenres)
    }, [allBooksQuery.data])

    const handleFilter = (genre) => {
        filter === genre ? setFilter(null) : setFilter(genre)
    }

    if (allBooksQuery.loading)
        return <h1>loading...</h1>

    return (
        <div>
            <h2>books</h2>

            {
                filter
                    ? <p>filtering by genre {filter}</p>
                    : null
            }

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
            {
                genres.map(genre => <button key={genre} onClick={() => handleFilter(genre)}>{genre}</button>)
            }
        </div>
    )
}

export default Books