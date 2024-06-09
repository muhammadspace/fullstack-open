require("./db.js")
const express = require("express")
const cors = require("cors")
const http = require("http")
const { WebSocketServer } = require("ws")
const { useServer } = require("graphql-ws/lib/use/ws")
const { ApolloServer } = require("@apollo/server")
const { ApolloServerPluginDrainHttpServer } = require("@apollo/server/plugin/drainHttpServer")
const { expressMiddleware } = require("@apollo/server/express4")
const { makeExecutableSchema } = require("@graphql-tools/schema")
const jwt = require("jsonwebtoken")
const User = require("./models/user.js")
const typeDefs = require("./typeDefs.js")
const resolvers = require("./resolvers.js")

async function start()
{
    const app = express()

    const httpServer = http.createServer(app)

    const wsServer = new WebSocketServer({
        server: httpServer,
        path: '/'
    })

    const schema = makeExecutableSchema({ typeDefs, resolvers })
    const serverCleanup = useServer({ schema }, wsServer)

    const apolloServer = new ApolloServer({
        schema,
        plugins: [
            ApolloServerPluginDrainHttpServer({ httpServer }),
            {
                async serverWillStart() {
                    return {
                        async drainServer() {
                            await serverCleanup.dispose()
                        }
                    }
                }
            }
        ]
    })

    await apolloServer.start()

    app.use(
        '/',
        express.json(),
        cors(),
        expressMiddleware(apolloServer, {
            context: async ({ req, res }) => {
            if (req.headers?.authorization?.startsWith("Bearer "))
                {
                    const token = jwt.verify(req.headers.authorization.substring(7), process.env.JWT_SECRET)
                    const currentUser = await User.findOne({ username: token.username }).populate("friends")
                    return { currentUser }
                }
            }
        })
    )

    const PORT = 4000
    httpServer.listen(PORT, () => 
        console.log(`Apollo Server running at http://localhost:${PORT} 🚀`)
    )
}

start()