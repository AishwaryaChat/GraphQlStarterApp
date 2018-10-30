const express = require('express')
const graphqlHTTP = require('express-graphql')
const schema = require('./schema/schema')
const mongoose = require('mongoose')

const server = express()

// connect to mlab
mongoose.connect('mongodb://aish:test1234@ds145463.mlab.com:45463/gql-1', { useNewUrlParser: true })
mongoose.connection.once('open', () => {
  console.log('connected to db gql-1')
})

server.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true
}))

server.listen(4000, () => {
  console.log('Server is running on: ', 4000)
})
