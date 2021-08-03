const mongoose = require('mongoose')
const { Schema } = mongoose

const userScheme = new Schema ({
    username: {type: String, unique: true, required: true},
    password: {type: String, required: true},
    todos: [{ text: String,
        isCheck: Boolean}]
})


module.exports = User = mongoose.model('user', userScheme)
