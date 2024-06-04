require("./db.js")

const { ApolloServer } = require("@apollo/server")
const { startStandaloneServer } = require("@apollo/server/standalone")
const { GraphQLError } = require("graphql")
const Person = require("./models/person.js")
const User = require("./models/user.js")
const jwt = require("jsonwebtoken")

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
        personCount: async () => await Person.collection.countDocuments(),
        allPersons: async (obj, args) => {
            if (!args.phone)
                return Person.find({})


            return Person.find({ phone: { $exists: args.phone === "YES" } })
        },
        findPerson: async (obj, args) => await Person.findOne({ name: args.name }),
        me: (obj, args, context) => {
            return context.currentUser
        }
    },
    Mutation: {
        addPerson: async (obj, args, { currentUser }) => {
            if (!currentUser)
            {
                throw new GraphQLError("Not authenticated", {
                    extensions: { code: "BAD_USER_INPUT" }
                })
            }

            if (await Person.findOne({ name: args.name }))
            {
                throw new GraphQLError("Name already taken", {
                    extensions: {
                        code: "BAD_USER_INPUT",
                        invalidArgs: args.name
                    }
                })
            }

            try 
            {
                const person = new Person({ ...args })
                currentUser.friends = currentUser.friends.concat(person)
                await person.save()
                await currentUser.save()

                return person
            } 
            catch (error)
            {
                throw new GraphQLError("Saving person failed." + error.message, {
                    extensions: {
                        code: "BAD_USER_INPUT",
                        invalidArgs: args.name,
                        error
                    }
                })
            }
        },
        editPhone: async (obj, args) => {
            const person = await Person.findOne({ name: args.name })
            person.phone = args.phone

            try 
            {
                await person.save()
            } catch (error) 
            {
                throw new GraphQLError("Saving new phone number failed", {
                    extensions: {
                        code: "BAD_USER_INPUT",
                        invalidArgs: args.phone,
                        error
                    }
                })
            }

            return person
        },
        createUser: async (obj, args) => {
            const user = new User({ ...args })
            return user.save()
                .catch(error => {
                    throw new GraphQLError("Invalid credentials", {
                        extensions: {
                            code: "BAD_USER_INPUT",
                            invalidArgs: args.username,
                            error
                        }
                })})
        },
        login: async (obj, args) => {
            const user = await User.findOne({ username: args.username })

            if (!user || args.password !== "secret")
            {
                throw new GraphQLError("wrong credentials", {
                    extensions: {
                        code: "BAD_USER_INPUT",
                    }
                })
            }

            const userForToken = { 
                username: user.username,
                id: user._id,
            }

            const token = jwt.sign(userForToken, process.env.JWT_SECRET)

            return { value: token }
        },
        addAsFriend: async (obj, args, { currentUser }) => {
            if (!currentUser)
            {
                throw new GraphQLError("Not authenticated", {
                    extensions: { code: "BAD_USER_INPUT" }
                })
            }

            const person = await Person.findOne({ name: args.name })
            if (!person)
            {
                throw new GraphQLError("Person not found", {
                    extensions: {
                        code: "BAD_USER_INPUT",
                        invalidArgs: args.name,
                    }
                })
            }

            const isFriend = (person) => currentUser.friends.map(f => f._id.toString()).includes(person._id.toString())

            if (isFriend(person))
            {
                throw new GraphQLError(`${person.name} is already a friend`, {
                    extensions: { code: "BAD_USER_INPUT", invalidArgs: person.name }
                })
            }
            else
            {
                currentUser.friends.concat(person)
                await currentUser.save()
                    .catch(error => {
                        throw new GraphQLError("Saving user failed", {
                            extensions: {
                                code: "BAD_USER_INPUT",
                                invalidArgs: args.name,
                                error
                            }
                        })
                    })
            }

            return currentUser
        }
    }
}

const apolloServer = new ApolloServer({ typeDefs, resolvers })

startStandaloneServer(apolloServer, { 
    listen: { port: 4000 },
    context: async ({ req, res }) => {
        if (req.headers?.authorization?.startsWith("Bearer "))
        {
            const token = jwt.verify(req.headers.authorization.substring(7), process.env.JWT_SECRET)
            const currentUser = await User.findOne({ username: token.username }).populate("friends")
            return { currentUser }
        }
    }
}).then(({ url }) => {
    console.log(`Apollo Server running at ${url} 🚀`)
})