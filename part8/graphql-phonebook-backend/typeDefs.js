const typeDefs = `
enum YesNo {
    YES
    NO
}

type User {
    username: String!
    friends: [Person!]!
    id: ID!
}

type Token {
    value: String!
}

type Address {
    street: String!
    city: String!
}

type Person {
    name: String!
    phone: String
    address: Address!
    friendOf: [User!]!
    id: ID!
}

type Query {
    personCount: Int!
    allPersons(phone: YesNo): [Person!]!
    findPerson(name: String!): Person
    me: User
}

type Mutation {
    addPerson(
        name: String!
        phone: String
        street: String!
        city: String!
    ): Person
    editPhone(
        name: String!
        phone: String!
    ): Person
    createUser(
        username: String!
    ): User
    login(
        username: String!
        password: String!
    ): Token
    addAsFriend(name: String!): User
}

type Subscription {
    personAdded: Person!
}
`

module.exports = typeDefs