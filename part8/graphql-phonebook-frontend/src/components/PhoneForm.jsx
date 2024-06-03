import { useEffect, useState } from "react"
import { useMutation } from "@apollo/client"
import { EDIT_PHONE } from "../queries.js"

const PhoneForm = ({ setError }) => {
    const [name, setName] = useState("")
    const [phone, setPhone] = useState("")
    const [editPhone, result] = useMutation(EDIT_PHONE, 
        {
            variables: { name, phone },
            onError: (error) => {
                const messages = error.graphQLErrors.map(e => e.message).join('\n')
                setError(messages)
            }
        }
    )

    // useEffect(() => {
    //     if (!result.data?.editPhone)
    //         setError("No person found")
    // }, [result.data])

    const onSubmit = e => {
        e.preventDefault()
        editPhone({ variables: { name, phone }})
        setName("")
        setPhone("")
    }

    return (
        <div>
            <h2>Edit Phone</h2>
            <form onSubmit={onSubmit}>
                <div>
                    <label htmlFor="name" id="name">name</label>
                    <input type="text" id="name" name="name" value={name} onChange={(e) => setName(e.target.value)}/>
                </div>
                <div>
                    <label htmlFor="phone" id="phone">phone</label>
                    <input type="text" id="phone" name="phone" value={phone} onChange={(e) => setPhone(e.target.value)}/>
                </div>
                <button type="submit">create</button>
            </form>
        </div>
    )
}

export default PhoneForm