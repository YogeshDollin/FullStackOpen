const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const schema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        minlength: 5
    },
    favoriteGenre: {
        type: String,
        minlength: 4
    }
})
schema.plugin(uniqueValidator)
module.exports = mongoose.model('User', schema)