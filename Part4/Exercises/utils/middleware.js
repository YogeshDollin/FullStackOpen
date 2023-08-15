const errorHandler = (error, request, response, next) => {
    if(error.name === 'ValidationError'){
        return response.status(400).json({error: error.message})
    }
    response.status(400).json({error: error.message})
}

const tokenExtractor = (request, response, next) => {
    const authorization = request.get('authorization')
    if(authorization && authorization.startsWith('Bearer ')){
        request.token = authorization.replace('Bearer ', '')
    }
    next()
}

module.exports = {errorHandler, tokenExtractor}