const { PubSub } = require("graphql-subscriptions")
const { GraphQLError } = require("graphql")
const Person = require("./models/person.js")
const User = require("./models/user.js")
const jwt = require("jsonwebtoken")

const pubsub = new PubSub()

const resolvers = {
    Person: {
        address: (obj) => {
            return {
                city: obj.city,
                street: obj.street
            }
        },
    },
    Query: {
        personCount: async () => await Person.collection.countDocuments(),
        allPersons: async (obj, args) => {
            console.log("Person.find")
            if (!args.phone)
                return Person.find({}).populate("friendOf")


            return Person.find({ phone: { $exists: args.phone === "YES" } }).populate("frinedOf")
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

                pubsub.publish("PERSON_ADDED", { personAdded: person })

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
    },
    Subscription: {
        personAdded: {
            subscribe: () => pubsub.asyncIterator("PERSON_ADDED")
        }
    }
}

module.exports = resolvers