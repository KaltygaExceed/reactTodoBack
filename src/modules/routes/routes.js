const express = require('express');
const router = express.Router();
const {check} = require("express-validator")

const {
    getAllTasks,
    createNewUser,
    createNewTask,
    deleteTask,
    loginFunc
} = require('../controllers/task.controller');

// Tasks routes
// router.get('/allTasks', getAllTasks);
router.post('/registration', [
    check('username', 'Имя не должно быть пустым').notEmpty(),
    check('password', 'Пароль должен быть больше 4 и не короче 10 символов').isLength({min: 4, max: 10}),
], createNewUser);

router.post('/login', loginFunc)
// router.patch('/createTask', createNewTask);
// router.patch('/deleteTask', deleteTask);

//User routes
module.exports = router;