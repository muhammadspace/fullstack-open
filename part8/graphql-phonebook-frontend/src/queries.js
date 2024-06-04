import { gql } from "@apollo/client"

export const ALL_PERSONS = gql`
    query {
        allPersons {
            name
            phone
            id
        }
    }
`

export const CREATE_PERSON = gql`
    mutation CreatePerson(
        $name: String!
        $phone: String
        $street: String!
        $city: String!
    ) {
        addPerson(
            name: $name
            phone: $phone
            street: $street
            city: $city
        ) {
            name
            phone
            address {
                street
                city
            }
            id
        }
    }
`

export const FIND_PERSON = gql`
    query findByName($nameToSearch: String!) {
        findPerson(name: $nameToSearch) {
            name
            phone
            address {
                city
                street
            }
            id
        }
    }
`

export const EDIT_PHONE = gql`
    mutation EditPhone($name: String!, $phone: String!) {
        editPhone(name: $name, phone: $phone) {
            name
            phone
            id
        }
    }
`

export const LOGIN = gql`
    mutation Login(
        $username: String!
        $password: String!
    ) {
        login(
            username: $username
            password: $password
        ) {
            value
        }
    }
`