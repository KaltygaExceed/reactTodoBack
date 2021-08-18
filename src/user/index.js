const mongoose = require('mongoose')
const { Schema } = mongoose

const todoScheme = new Schema({
    userID: String,
    text: String,
    isCheck: Boolean
})

const userScheme = new Schema ({
    username: {type: String, unique: true, required: true},
    password: {type: String, required: true}
})


module.exports = {
    User : mongoose.model('user', userScheme),
    Task : mongoose.model('task', todoScheme)
}
