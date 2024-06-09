const { PubSub } = require("graphql-subscriptions")
const jwt = require("jsonwebtoken")
const Book = require("./models/book.js")
const Author = require("./models/author.js")
const User = require("./models/user.js")
const { GraphQLError } = require("graphql")

const pubsub = new PubSub()

const resolvers = {
    // Author: {
    //     bookCount: async (obj) => {
    //         console.log("Book.collection.countDocuments")
    //         return obj.authored.length
    //     }
    // },
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
        allAuthors: async () => {
            console.log("Author.find")
            return await Author.find({})
        },
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
            if (author?.bookCount)
            {
                author.bookCount = author.bookCount + 1
                await author.save()
            }

            if (!author)
            {
                author = new Author({ name: args.author, bookCount: 1 })
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


            pubsub.publish("BOOK_ADDED", { bookAdded: book.populate("author") })

            return book
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
    },
    Subscription: {
        bookAdded: {
            subscribe: () => pubsub.asyncIterator("BOOK_ADDED")
        }
    }
}

module.exports = resolvers