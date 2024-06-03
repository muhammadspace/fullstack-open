import { useState } from "react"
import { useMutation, gql } from "@apollo/client"
import { ALL_PERSONS, CREATE_PERSON } from "../queries"

const PersonForm = ({ setError }) => {
    const [name, setName] = useState("")
    const [phone, setPhone] = useState("")
    const [street, setStreet] = useState("")
    const [city, setCity] = useState("")
    const [createPerson] = useMutation(CREATE_PERSON, {
        onError: (error) => {
            const messages = error.graphQLErrors.map(e => e.message).join('\n')
            setError(error.message)
        },
        refetchQueries: [ { query: ALL_PERSONS }]
    })

    const onSubmit = e => {
        e.preventDefault()
        createPerson({ variables: { name, phone, street, city }})
        setName("")
        setPhone("")
        setStreet("")
        setCity("")
    }

    return (
        <div>
            <h2>Create Person</h2>
            <form onSubmit={onSubmit}>
                <div>
                    <label htmlFor="name" id="name">name</label>
                    <input type="text" id="name" name="name" value={name} onChange={(e) => setName(e.target.value)}/>
                </div>
                <div>
                    <label htmlFor="phone" id="phone">phone</label>
                    <input type="text" id="phone" name="phone" value={phone} onChange={(e) => setPhone(e.target.value)}/>
                </div>
                <div>
                    <label htmlFor="street" id="street">street</label>
                    <input type="text" id="street" name="street" value={street} onChange={(e) => setStreet(e.target.value)}/>
                </div>
                <div>
                    <label htmlFor="city" id="city">city</label>
                    <input type="text" id="city" name="city" value={city} onChange={(e) => setCity(e.target.value)}/>
                </div>
                <button type="submit">create</button>
            </form>
        </div>
    )
}

export default PersonForm