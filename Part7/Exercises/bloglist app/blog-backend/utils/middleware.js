const jwt = require('jsonwebtoken')
const User = require('../models/user')
const config = require('../utils/config')

const errorHandler = (error, request, response, next) => {
    if(error.name === 'ValidationError'){
        return response.status(400).json({error: error.message})
    }
    response.status(500).json({error: error.message})
}

const tokenExtractor = (request, response, next) => {
    const authorization = request.get('authorization')
    if(authorization && authorization.startsWith('Bearer ')){
        request.token = authorization.replace('Bearer ', '')
    }
    next()
}

const userExtractor = async (request, response, next) => {
    if(request.token){
        const decodedToken = jwt.verify(request.token, config.SECRET)
        request.user = await User.findById(decodedToken.id)
    }
    next()
}

module.exports = {errorHandler, tokenExtractor, userExtractor}