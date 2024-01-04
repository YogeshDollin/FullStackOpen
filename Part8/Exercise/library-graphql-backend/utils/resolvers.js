const Author = require('../models/author')
const Book = require('../models/book')
const User = require('../models/user')
const { GraphQLError } = require('graphql')
const jwt = require('jsonwebtoken')
const {PubSub} = require('graphql-subscriptions')
const pubSub = new PubSub()

const resolvers = {
    Query: {
      bookCount: () => Book.collection.countDocuments(),
      authorCount: () => Author.collection.countDocuments() ,
      allBooks : async (root, args) => {
        // if(args.author && args.genre){
        //   return books.filter( book => book.author === args.author && book.genres.includes(args.genre))
        // }
        // return args.author ? books.filter(book => book.author === args.author): args.genre ? books.filter(book => book.genres.includes(args.genre)) : books
        return args.genre ? Book.find({genres: args.genre}).populate('author') : Book.find({}).populate('author')
      },
      allAuthors: async () => {
        return Author.find({})
      },
      me: (root, args, context) => context.currentUser
    },
    Mutation: {
      addBook: async (root, args, context) => {
        if(!context.currentUser)
          throw new GraphQLError('User not authenticated', {
            extensions: {
              code:'BAD_USER_INPUT'
            }})
        const author = await Author.findOne({name: args.author})
        if(author){
          const newBook = new Book({title: args.title, published: args.published, author: author, genres: args.genres})
          return newBook.save()
            .then(() => {
              pubSub.publish('BOOK_ADDED', {bookAdded: newBook})
            })
            .catch(error => {
              throw new GraphQLError('Failed to add book', {
                extensions: {
                  code: 'BAD_USER_INPUT',
                  invalidArgs: {...args},
                  error
                }
              })
            })
        }
      },
      editAuthor: async (root, args, context) => {
        // const author = authors.find(author => author.name === args.name)
        // if(!author) return null
        // const updatedAuthor = {...author, born: args.setBornTo}
        // authors = authors.map(author => author.name === args.name ? updatedAuthor : author)
        // return updatedAuthor
        if(!context.currentUser)
          throw new GraphQLError('User not authenticated', {
            extensions: {
              code:'BAD_USER_INPUT'
            }})
  
        const author = await Author.findOne({name: args.name})
        if(!author)
          throw new GraphQLError('Author does not exist', {
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs: args.name
            }
          })
        author.born = args.setBornTo
        try {
          await author.save()  
        } catch (error) {
          throw new GraphQLError('Failed to update', {
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs: {...args},
              error
            }
          })
        }
  
        return author
      },
      createUser: async (root, args) => {
        const user = new User({username: args.username, favoriteGenre: args.favoriteGenre})
        return user.save()
          .catch(error => {
            throw new GraphQLError('failed to create user', {
              extensions: {
                code: 'BAD_USER_INPUT',
                invalidArgs: args.username,
                error
              }
            })
          })
      },
      login: async (root, args) => {
        const user = await User.findOne({username: args.username})
        if(!user || args.password !== 'wordpass'){
          throw new GraphQLError('Wrong credentials', {
            extensions: {
              code: 'BAD_USER_INPUT',
            }
          })
        }
        const userForToken = {
          username: user.username,
          id: user._id
        }
        return {value: jwt.sign(userForToken, process.env.SECRET_KEY)}
      }
    },
    Subscription : {
      bookAdded: {
        subscribe: () => pubSub.asyncIterator('BOOK_ADDED')
      }
    }
  }

  module.exports = resolvers