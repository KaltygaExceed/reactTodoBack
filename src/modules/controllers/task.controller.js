const User = require('../../user/index')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const {validationResult} = require('express-validator')
const {secret} = require('./keyConfig')

const generateAccessToken = (id) => {
    const payload = {
        id
    }
    return jwt.sign(payload, secret, {expiresIn: "24h"})
}

module.exports.createNewUser = async (req, res) => {
    console.log(req.body)
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({message: 'Ошибка при регистрации'})
        }
        const {username, password} = req.body
        const candidate = await User.findOne({username})
        if (!candidate) {
            const hashPassword = bcrypt.hashSync(password, 1)
            const user = new User({username, password: hashPassword})
            await user.save()
            return res.status(200).json({message: 'Registration successful'})
        } else {
            return res.status(400).json({message: 'Already registered user'})

        }
    } catch (err) {
        res.status(400).json({message: 'Registration error'})
    }
}

module.exports.loginFunc = async (req, res) => {
    try {
        const {username, password} = req.body
        const user = await User.findOne({username})
        if (!user) {
            return res.status(400).json({message: `Пользователь ${username} не найден`})
        }
        const validPassword = bcrypt.compareSync(password, user.password)
        if (!validPassword) {
            return res.status(400).json({message: `Введён неверный пароль`})
        }
        const token = generateAccessToken(user._id)
        return res.json({token})
    } catch (e) {
        res.status(400).json({message: 'Login error'})
    }
}


// module.exports.getAllTasks = (req, res) => {
//     User.find().then(result => {
//         res.send({data: result})
//     })
// }


//
// module.exports.deleteTask = (req, res, next) => {
//     Task.deleteOne({_id:req.query.id}).then(result => {
//         res.json(result)
//     })
// }
