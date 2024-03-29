const Person = require('../models/person')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const {GraphQLError} = require('graphql')
const {PubSub} =require('graphql-subscriptions')

const pubSub = new PubSub()

const resolvers = {
    Query: {
        personCount: async () => Person.collection.countDocuments(),
        allPersons:async (root, args) => {
            // if(!args.phone) return persons
            // const byPhone = (person) => args.phone === 'YES' ? person.phone : !person.phone
            // return persons.filter(byPhone)
            if(!args.phone) return Person.find({})
            return Person.find({phone: {exists: args.phone === 'YES'}})
        },
        findPerson: async (root, args) => Person.findOne({name: args.name}),
        me: async (root, args, context) => context.currentUser
    },
    Person: {
        address: (root) => {
            return {
                city: root.city,
                street: root.street
            }
        }
    },
    Mutation: {
        addPerson: async (root, args, context) => {
            const person = new Person({...args})
            const currentUser = context.currentUser

            if(!currentUser){
                throw new GraphQLError('User not authenticated', {
                    extensions: {
                        code: 'BAD_USER_INPUT'
                    }
                })
            }

            try {
                await person.save()
                currentUser.friends = currentUser.friends.concat(person)
                await currentUser.save()
            } catch (error) {
                throw new GraphQLError('Saving person failed', {
                    extensions: {
                        code: 'BAD_USER_INPUT',
                        invalidArgs: args.name,
                        error
                    }
                })
            }

            pubSub.publish('PERSON_ADDED', {personAdded: person})

            return person
        },
        editNumber: async (root, args) => {
            // const existPerson = persons.find(p => p.name === args.name)
            // if(!existPerson) return null
            // const updatePerson = {...existPerson, phone: args.phone}
            // persons = persons.map(person => person.name === args.name ? updatePerson: person)
            // return updatePerson
            const person = await Person.findOne({name: args.name})
            person.phone = args.phone
            try {
                await person.save()
            } catch (error) {
                throw new GraphQLError('Saving number failed', {
                    extensions: {
                        code: 'BAD_USER_INPUT',
                        invalidArgs: args.name,
                        error
                    }
                })
            }
            return person
        },
        createUser: async (root, args) => {
            const user = new User({username: args.username})
            return user.save()
                .catch(error => {
                    throw new GraphQLError('Creating the user failed', {
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
            if(!user || args.password !== 'secret') {
                throw new GraphQLError('wrong credentials', {
                    extensions: {
                        code: 'BAD_USER_INPUT'
                    }
                })
            }
            const userForToken = {
                username: user.username,
                id: user._id
            }

            return {value: jwt.sign(userForToken, process.env.JWT_SECRET)}
        },
        addAsFriend: async (root, args, {currentUser}) => {
            const isFriend = (person) => currentUser.friends.map(f => f._id.toString()).includes(person._id.toString())

            if(!currentUser){
                throw new GraphQLError('User not authenticated', {
                    extensions: {
                        code: 'BAD_USER_INPUT'
                    }
                })
            }

            const person = await Person.findOne({name: args.name})
            if(!isFriend(person)){
                currentUser.friends = currentUser.friends.concat(person)
            }

            return currentUser.save()
        }
    },
    Subscription : {
        personAdded: {
            subscribe: () => pubSub.asyncIterator('PERSON_ADDED')
        }
    }
}

module.exports = resolvers