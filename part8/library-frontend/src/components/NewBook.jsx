import { useState } from 'react'
import { useMutation } from "@apollo/client"
import { ADD_BOOK, ALL_BOOKS } from '../queries'
import { Navigate } from 'react-router-dom'

const NewBook = () => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [published, setPublished] = useState('')
    const [genre, setGenre] = useState('')
    const [genres, setGenres] = useState([])
    const [addBook] = useMutation(ADD_BOOK, {
        variables: { title, author, published: Number(published), genres },
        onError: (error) => {
            console.error(error)
            const messages = error.graphQLErrors.map(e => e.message)
            console.error(messages)
        },
        update: (cache, result) => {
            cache.updateQuery({ query: ALL_BOOKS }, (data) => {
                return {
                    allBooks: data.allBooks.concat(result.data.addBook)
                }
            })
        },
    })

    const submit = async (event) => {
        event.preventDefault()

        addBook()

        setTitle('')
        setPublished('')
        setAuthor('')
        setGenres([])
        setGenre('')
    }

    const addGenre = () => {
        setGenres(genres.concat(genre))
        setGenre('')
    }

    return (
        <div>
            {
                !localStorage.getItem("library-user-token") && <Navigate to="/login" replace />
            }
            <form onSubmit={submit}>
                <div>
          title
                    <input
                        value={title}
                        onChange={({ target }) => setTitle(target.value)}
                    />
                </div>
                <div>
          author
                    <input
                        value={author}
                        onChange={({ target }) => setAuthor(target.value)}
                    />
                </div>
                <div>
          published
                    <input
                        type="number"
                        value={published}
                        onChange={({ target }) => setPublished(target.value)}
                    />
                </div>
                <div>
                    <input
                        value={genre}
                        onChange={({ target }) => setGenre(target.value)}
                    />
                    <button onClick={addGenre} type="button">
            add genre
                    </button>
                </div>
                <div>genres: {genres.join(' ')}</div>
                <button type="submit">create book</button>
            </form>
        </div>
    )
}

export default NewBook