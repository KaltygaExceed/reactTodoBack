const {User, Task} = require('../../user/index')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const {validationResult} = require('express-validator')
const {secret} = require('./keyConfig')

const generateAccessToken = (id) => {
    const payload = {
        id
    }
    return jwt.sign(payload, secret, {expiresIn: "1h"})
}

module.exports.createNewUser = async (req, res, next) => {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({message: 'Registration error'})
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
    } catch (error) {
        // res.status(400).json({error, message: 'Registration error'})
        return next(error)
    }
}

module.exports.loginFunc = async (req, res, next) => {
    try {
        const {username, password} = req.body
        const user = await User.findOne({username})
        if (!user) {
            return res.status(400).json({message: `User ${username} not found!`})
        }
        const validPassword = bcrypt.compareSync(password, user.password)
        if (!validPassword) {
            return res.status(400).json({message: `Wrong password!`})
        }
        const token = generateAccessToken(user._id)
        return res.json({token, message: 'Login successful'})
    } catch (error) {
        // res.status(400).json({error, message: 'Login error'})
        return next(error)
    }
}

module.exports.getTasks = async (req, res, next) => {
    try {
        const id = req.user
        let allTasks = await Task.find({userID: id})
        let edTasks = []
        await allTasks.map((item) => {
            edTasks.push({id: item._id, text: item.text, isCheck: item.isCheck})
        })
        return res.status(200).json(edTasks)
    } catch (error) {
        // res.status(400).json({error, message: 'Login error'})
        return next(error)
    }
}

module.exports.createNewTask = async (req, res, next) => {
    try {
        const {text, isCheck} = req.body
        const id = req.user
        const user = await User.findById(id)
        if (!user) {
            return res.status(400).json({message: `User not found!`})
        }
        const newTask = await Task.create({userID: id, text, isCheck})
        const taskID = newTask._id
        res.status(200).json({message: 'Task created!', taskID: taskID})
    } catch (error) {
        // res.status(400).json({error, message: 'Login error'})
        return next(error)
    }
}

module.exports.deleteTask = (req, res) => {
    Task.deleteOne({_id: req.query.id}).then(result => {
        res.json({result, message: 'Task deleted!'})
    })
}

module.exports.checkTask = async (req, res, next) => {
    try {
        const _id = req.body.id
        const isCheck = req.body.isCheck
        const result = await Task.findOneAndUpdate({_id}, {isCheck}, {new: true})
        res.status(200).json(result)
    } catch (error) {
        // res.status(400).json(error)
        return next(error)
    }
}

module.exports.checkAllTasks = async (req, res, next) => {
    try {
        const userID = req.user
        const isCheck = true
        const result = await Task.updateMany({userID}, {isCheck}, {new: true})
        res.status(200).json(result)
    } catch (error) {
        // res.status(400).json(error)
        return next(error)
    }
}

module.exports.deleteChecked = async (req, res, next) => {
    try {
        const userID = req.user
        const isCheck = true
        const result = await Task.deleteMany({userID, isCheck})
        res.status(200).json(result)
    } catch (error) {
        // res.status(400).json(error)
        return next(error)
    }

}