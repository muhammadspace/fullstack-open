import { gql } from "@apollo/client"

export const ALL_AUTHORS = gql`
    query {
        allAuthors {
            name
            born
            bookCount
            id
        }
    }
`

export const ALL_BOOKS = gql`
    query {
        allBooks {
            title
            author
            published
            genres
            id
        }
    }
`

export const ADD_BOOK = gql`
    mutation AddBook(
        $title: String!
        $author: String!
        $published: Int!
        $genres: [String!]!
    ) {
        addBook (
            title: $title
            author: $author
            published: $published
            genres: $genres
        ) {
            title
            author
            published
            genres
            id
        }
    }
`

export const EDIT_BIRTH_YEAR = gql`
    mutation EditBirthYear(
        $name: String!
        $setBornTo: Int!
    ) {
        editAuthor(
            name: $name
            setBornTo: $setBornTo
        ) {
            name
            born
            bookCount
            id
        }
    }
`