import { useQuery, useMutation } from "@apollo/client"
import { ALL_AUTHORS, EDIT_BIRTH_YEAR } from "../queries";
import { useState } from "react";

const AuthorForm = ({ authors }) => {
    const [name, setName] = useState("")
    const [born, setBorn] = useState("")
    const [editBirthYear] = useMutation(EDIT_BIRTH_YEAR, {
        variables: { name, setBornTo: Number(born) }
    })

    const onSubmit = (e) => {
        e.preventDefault()
        editBirthYear()

        setBorn("")
    }

    return (
        <div>
            <h2>Set birthyear</h2>
            <form onSubmit={onSubmit}>
                <div>
                    <label htmlFor="name" id="name">name</label>
                    <select id="name" name="name" value={name} onChange={(e) => setName(e.target.value)}>
                        {
                            authors.map(a => (
                                <option key={a.name} value={a.name}>{a.name}</option>
                            ))
                        }
                    </select>
                </div>
                <div>
                    <label htmlFor="born" id="born">born</label>
                    <input type="text" id="born" name="born" value={born} onChange={(e) => setBorn(e.target.value)}/>
                </div>
                <button type="submit">update author</button>
            </form>
        </div>
    )
}

const Authors = () => {
    const allAuthorsQuery = useQuery(ALL_AUTHORS)

    if (allAuthorsQuery.loading)
        return <h1>loading...</h1>

    const authors = allAuthorsQuery.data?.allAuthors

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
            <AuthorForm authors={authors}/>
        </div>
    )
}

export default Authors
