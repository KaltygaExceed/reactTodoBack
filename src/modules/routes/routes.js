const express = require('express');
const router = express.Router();
const {check} = require("express-validator")
const authMiddleware = require('../middleware/authMiddleware')

const {
    createNewUser,
    loginFunc,
    createNewTask,
    deleteTask,
    getTasks,
    checkTask,
    checkAllTasks,
    deleteChecked
} = require('../controllers/task.controller');

// Tasks routes

router.post('/registration', [
    check('username', 'Имя не должно быть пустым').notEmpty(),
    check('password', 'Пароль должен быть больше 4 и не короче 10 символов').isLength({min: 4, max: 10}),
], createNewUser);

router.post('/login', loginFunc)

router.get('/getAll', authMiddleware, getTasks)

router.post('/createTask', authMiddleware, createNewTask)

router.delete('/deleteTask', authMiddleware, deleteTask);

router.patch('/checkTask', authMiddleware, checkTask)

router.patch('/checkAllTasks', authMiddleware, checkAllTasks)

router.delete('/deleteChecked', authMiddleware, deleteChecked)

//User routes
module.exports = router;