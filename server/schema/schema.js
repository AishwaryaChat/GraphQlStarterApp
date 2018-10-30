const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID, GraphQLInt, GraphQLList } = require('graphql')
const _ = require('lodash')

// dummy data
const books = [
  { name: 'Book1', genre: 'Comedy', id: '1', authorId: '1' },
  { name: 'Book2', genre: 'Fantasy', id: '2', authorId: '2' },
  { name: 'Book3', genre: 'Drama', id: '3', authorId: '1' },
  { name: 'Book4', genre: 'Comedy', id: '4', authorId: '3' },
  { name: 'Book5', genre: 'Horror', id: '5', authorId: '4' }
]

const authors = [
  { name: 'Author1', age: 24, id: '1' },
  { name: 'Author2', age: 25, id: '2' },
  { name: 'Author3', age: 26, id: '3' },
  { name: 'Author4', age: 27, id: '4' }
]

const BookType = new GraphQLObjectType({
  name: 'Book',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    author: {
      type: AuthorType,
      resolve (parent, args) {
        return _.find(authors, { id: parent.authorId })
      }
    }
  })
})

const AuthorType = new GraphQLObjectType({
  name: 'Author',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    books: {
      type: new GraphQLList(BookType),
      resolve (parent, args) {
        return _.filter(books, { authorId: parent.id })
      }
    }
  })
})

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    book: {
      type: BookType,
      args: { id: { type: GraphQLID } },
      resolve (parent, args) {
        // code to get data from fb
        return _.find(books, { id: args.id })
      }
    },
    author: {
      type: AuthorType,
      args: { id: { type: GraphQLID } },
      resolve (parent, args) {
        return _.find(authors, { id: args.id })
      }
    },
    books: {
      type: new GraphQLList(BookType),
      resolve (parent, args) {
        return books
      }
    },
    authors: {
      type: new GraphQLList(AuthorType),
      resolve (parent, args) {
        return authors
      }
    }
  }
})

module.exports = new GraphQLSchema({
  query: RootQuery
})
