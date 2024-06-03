const { ApolloServer } = require("@apollo/server")
const { startStandaloneServer } = require("@apollo/server/standalone")
const { GraphQLError } = require("graphql")
const { v1: uuid } = require("uuid")

const persons = [
  {
    name: "Arto Hellas",
    phone: "040-123543",
    street: "Tapiolankatu 5 A",
    city: "Espoo",
    id: "3d594650-3436-11e9-bc57-8b80ba54c431"
  },
  {
    name: "Matti Luukkainen",
    phone: "040-432342",
    street: "Malminkaari 10 A",
    city: "Helsinki",
    id: '3d599470-3436-11e9-bc57-8b80ba54c431'
  },
  {
    name: "Venla Ruuska",
    street: "Nallemäentie 22 C",
    city: "Helsinki",
    id: '3d599471-3436-11e9-bc57-8b80ba54c431'
  },
]


const typeDefs = `
enum YesNo {
    YES
    NO
}

type Address {
    street: String!
    city: String!
}

type Person {
    name: String!
    phone: String
    address: Address!
    id: ID!
}

type Query {
    personCount: Int!
    allPersons(phone: YesNo): [Person!]!
    findPerson(name: String!): Person
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
        phone: String
    ): Person
}
`
const resolvers = {
    Person: {
        address: (obj) => {
            return {
                city: obj.city,
                street: obj.street
            }
        }
    },
    Query: {
        personCount: () => persons.length,
        allPersons: (obj, args) => {
            if (!args.phone)
                return persons


            const byPhone = (person) => args.phone === "NO" ? (person.phone == null) : (person.phone != null)
            return persons.filter(byPhone)
        },
        findPerson: (obj, args) => persons.find(p => p.name === args.name)
    },
    Mutation: {
        addPerson: (obj, args) => {
            if (persons.find(p => p.name === args.name))
            {
                throw new GraphQLError("Name already taken", {
                    extensions: {
                        code: "BAD_USER_INPUT",
                        invalidArgs: args.name
                    }
                })
            }

            const person = { ...args, id: uuid() }
            persons.push(person)
            return person
        },
        editPhone: (obj, args) => {
            const person = persons.find(p => p.name === args.name)
            person.phone = args.phone
            return person
        }
    }
}

const apolloServer = new ApolloServer({ typeDefs, resolvers })

startStandaloneServer(apolloServer, { listen: { port: 4000 } }).then(({ url }) => {
    console.log(`
    Apollo Server running at ${url} 🚀
    `)
})