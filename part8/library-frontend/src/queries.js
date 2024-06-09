import { gql } from "@apollo/client"

const BOOK_DETAILS = gql`
    fragment BookDetails on Book {
        title,
        published,
        genres
        author {
            name,
            born,
            bookCount,
            id
        },
        id
    }
`

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
    query AllBooks($author: String, $genre: String) {
        allBooks(author: $author, genre: $genre) {
            title
            author {
                name
                id
                born
            }
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
            author {
                name
                born
                id
            }
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

export const ME = gql`
    query {
        me {
            username
            favoriteGenre
            id
        }
    }
`

export const BOOK_ADDED = gql`
    subscription {
        bookAdded {
            ...BookDetails
        }
    }
    ${BOOK_DETAILS}
`