const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')

const User = require('./models/user')
const { default: mongoose } = require('mongoose')
require('dotenv').config()

const jwt = require('jsonwebtoken')
const typeDefs = require('./utils/schema')
const resolvers = require('./utils/resolvers')

const express = require('express')
const {makeExecutableSchema} = require('@graphql-tools/schema')
const {ApolloServerPluginDrainHttpServer} = require('@apollo/server/plugin/drainHttpServer')
const cors = require('cors')
const {expressMiddleware} = require('@apollo/server/express4')
const {WebSocketServer} = require('ws')
const {useServer} = require('graphql-ws/lib/use/ws')

const MONGODB_URI = process.env.MONGODB_URI
console.log('connecting to DB')
mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('connected to DB')
  })
  .catch(error => {
    console.log('failed connecting to DB: ', error.message)
  })

let authors = [
  {
    name: 'Robert Martin',
    id: "afa51ab0-344d-11e9-a414-719c6709cf3e",
    born: 1952,
  },
  {
    name: 'Martin Fowler',
    id: "afa5b6f0-344d-11e9-a414-719c6709cf3e",
    born: 1963
  },
  {
    name: 'Fyodor Dostoevsky',
    id: "afa5b6f1-344d-11e9-a414-719c6709cf3e",
    born: 1821
  },
  { 
    name: 'Joshua Kerievsky', // birthyear not known
    id: "afa5b6f2-344d-11e9-a414-719c6709cf3e",
  },
  { 
    name: 'Sandi Metz', // birthyear not known
    id: "afa5b6f3-344d-11e9-a414-719c6709cf3e",
  },
]
let books = [
  {
    title: 'Clean Code',
    published: 2008,
    author: 'Robert Martin',
    id: "afa5b6f4-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring']
  },
  {
    title: 'Agile software development',
    published: 2002,
    author: 'Robert Martin',
    id: "afa5b6f5-344d-11e9-a414-719c6709cf3e",
    genres: ['agile', 'patterns', 'design']
  },
  {
    title: 'Refactoring, edition 2',
    published: 2018,
    author: 'Martin Fowler',
    id: "afa5de00-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring']
  },
  {
    title: 'Refactoring to patterns',
    published: 2008,
    author: 'Joshua Kerievsky',
    id: "afa5de01-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring', 'patterns']
  },  
  {
    title: 'Practical Object-Oriented Design, An Agile Primer Using Ruby',
    published: 2012,
    author: 'Sandi Metz',
    id: "afa5de02-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring', 'design']
  },
  {
    title: 'Crime and punishment',
    published: 1866,
    author: 'Fyodor Dostoevsky',
    id: "afa5de03-344d-11e9-a414-719c6709cf3e",
    genres: ['classic', 'crime']
  },
  {
    title: 'The Demon ',
    published: 1872,
    author: 'Fyodor Dostoevsky',
    id: "afa5de04-344d-11e9-a414-719c6709cf3e",
    genres: ['classic', 'revolution']
  },
]
const server = new ApolloServer({
  typeDefs,
  resolvers
})

const start = async () => {
  const http = require('http')
  const app = express()

  const httpServer = http.createServer(app)

  const wsServer = new WebSocketServer({
    server: httpServer,
    path: '/'
  })

  const schema = makeExecutableSchema({typeDefs, resolvers})
  const serverCleanup = useServer({schema}, wsServer)

  const server = new ApolloServer({
    schema,
    plugins: [ApolloServerPluginDrainHttpServer({httpServer}), {
      async serverWillStart() {
        return {
          async drainServer() {
            await serverCleanup.dispose()
          }
        }
      }
    }]
  })

  await server.start()

  app.use(
    '/',
    cors(),
    express.json(),
    expressMiddleware(server, {
      context: async ({req}) => {
        const auth = req ? req.headers.authorization : null
        if(auth && auth.startsWith('Bearer ')){
          const decodedToken = jwt.verify(auth.substring(7), process.env.SECRET_KEY)
          const currentUser = User.findById(decodedToken.id)
          return {currentUser}
        }
      }
    })
  )

  const PORT = 4000
  httpServer.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  })
}
start()