const express = require('express')
const graphqlHTTP = require('express-graphql')
const schema = require('./schema/schema')

const server = express()

server.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true
}))

server.listen(4000, () => {
  console.log('Server is running on: ', 4000)
})
