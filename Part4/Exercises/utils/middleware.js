const errorHandler = (error, request, response, next) => {
    console.log('-----------------')
    if(error.name === 'ValidationError'){
        console.log('===========================')
        return response.status(400).json({error: error.message})
    }
}

module.exports = {errorHandler}