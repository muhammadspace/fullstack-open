import { useState } from "react"
import { useQuery, gql } from "@apollo/client"
import { FIND_PERSON } from "../queries"

const Person = ({ person, onClose }) => {
    return (
        <div>
            <h1>{person.name}</h1>
            <p>{person.phone}</p>
            <p>{person.address.street}</p>
            <p>{person.address.city}</p>

            <button onClick={onClose}>close</button>
        </div>
    )
}

const Persons = ({ persons }) => {
    const [nameToSearch, setNameToSearch] = useState(null)
    const result = useQuery(FIND_PERSON, {
        variables: { nameToSearch },
        skip: !nameToSearch
    })

    if (nameToSearch && result.data?.findPerson)
    {
        return (
            <Person 
                person={result.data.findPerson}
                onClose={() => setNameToSearch("")}
                />
        )
    }

    return (
        <div>
            {
                persons.map(p => (
                    <div key={p.name}>
                        {p.name} {p.phone}
                        <button onClick={() => setNameToSearch(p.name)}>show address</button>
                    </div>
                ))
            }
        </div>
    )
}

export default Persons