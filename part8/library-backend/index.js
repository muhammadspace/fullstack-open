require("dotenv").config()
require("./db.js")
const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')
const jwt = require("jsonwebtoken")
const Book = require("./models/book.js")
const Author = require("./models/author.js")
const User = require("./models/user.js")
const { GraphQLError } = require("graphql")

const typeDefs = `
type User {
    username: String!
    favoriteGenre: String!
    id: ID!
}

type Token {
    value: String!
}

type Book {
    title: String!
    author: Author!
    published: String!
    genres: [String!]!
    id: ID!
}

type Author {
    name: String!
    born: Int
    bookCount: Int!
    id: ID!
}

type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
    me: User
}

type Mutation {
    addBook(
        title: String!
        author: String!
        published: Int!
        genres: [String!]!
    ): Book
    editAuthor(
        name: String!
        setBornTo: Int!
    ): Author
    createUser(
        username: String!
        favoriteGenre: String!
    ): User!
    login(
        username: String!
        password: String!
    ): Token
}
`

const resolvers = {
    Author: {
        bookCount: (obj) => {
            return books.filter(book => book.author === obj.name).length
        }
    },
    Book: {
        author: async (obj) => {
            const author = await Author.findOne({ _id: obj.author })
            return author
        }
    },
    Query: {
        bookCount: () => Book.collection.countDocuments(),
        authorCount: () => Author.collection.countDocuments(),
        allBooks: async (obj, args) => {
            const author = args.author
                ? await Author.findOne({ name: args.author })
                : null

            if (author && args.genre)
            {
                const books = await Book.find({ author: author.id, genres: args.genre })
            }
            else if (author)
            {
                const books = await Book.find({ author: author.id })
                return books
            }
            else if (args.genre)
            {
                const books = await Book.find({ genres: args.genre })
                return books
            }

            return Book.find({})
        },
        allAuthors: async () => await Author.find({}),
        me: (obj, args, context) => context.currentUser
    },
    Mutation: {
        addBook: async (obj, args, context) => {
            if (!context.currentUser)
                throw new GraphQLError("Not authenticated", {
                    extensions: { code: "BAD_USER_INPUT" }
                })

            const book = new Book({ ...args })

            let author = await Author.findOne({ name: args.author })
            if (!author)
            {
                author = new Author({ name: args.author })
                try
                {
                    await author.save()
                }
                catch (error)
                {
                    throw new GraphQLError(`Creating a new author failed. ${error.message}`, {
                        extensions: {
                            code: "BAD_USER_INPUT",
                            invalidArgs: args.author,
                            error
                        }
                    })
                }
            }

            book.author = author._id
            try
            {
                await book.save()
            }
            catch (error)
            {
                throw new GraphQLError(`Creating book failed. ${error.message}`, {
                    extensions: {
                        code: "BAD_USER_INPUT",
                        invalidArgs: args.title,
                        error
                    }
                })
            }


            return book.populate("author")
        },
        editAuthor: async (obj, args, context) => {
            if (!context.currentUser)
                throw new GraphQLError("Not authenticated", {
                    extensions: { code: "BAD_USER_INPUT" }
                })

            const author = await Author.findOne({ name: args.name })

            if (author)
            {
                author.born = args.setBornTo
                await author.save()
            }

            return author
        },
        createUser: async (obj, args) => {
            const user = new User({ ...args })
            return user.save()
                .catch(error => {
                    throw new GraphQLError(`Creating user failed. ${error.message}`, {
                        extensions: {
                            code: "BAD_USER_INPUT",
                            invalidArgs: args,
                            error
                        }
                    })
                })
        },
        login: async (obj, args) => {
            const user = await User.findOne({ username: args.username })

            if (!(user && (args.password === "secret")))
                throw new GraphQLError("Invalid credentials", {
                    extensions: { code: "BAD_USER_INPUT" }})

            const userForToken = {
                username: args.username,
                favoriteGenre: args.favoriteGenre,
                id: user._id
            }

            return { value: jwt.sign(userForToken, process.env.JWT_SECRET) }
        }
    }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

startStandaloneServer(server, {
    listen: { port: 4000 },
    context: async ({ req, res }) => {
        if (req.headers?.authorization?.startsWith("Bearer "))
        {
            const token = req.headers.authorization.substring(7)
            const decodedToken = jwt.verify(token, process.env.JWT_SECRET)

            const currentUser = await User.findById(decodedToken.id)

            return { currentUser }
        }
    }
}).then(({ url }) => {
    console.log(`Server ready at ${url}`)
})
