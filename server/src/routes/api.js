const express = require('express');
const { check } = require("express-validator");
const Register  = require('../controllers/Register.controller');
const RegisterSchema  = require('../validationSchema/RegisterSchema');
const Login = require('../controllers/Login.controller');
const LoginSchema = require('../validationSchema/LoginSchema');
const createTodo = require('../controllers/Todo.controller');
const GetTodos = require('../controllers/TodoList.controller');
const MarkTodo = require('../controllers/MarkTodo.controller');
const RemoveTodo = require('../controllers/RemoveTodo.controller');

const apiRoute = express.Router();
const apiProtected = express.Router();

apiRoute.post('/register',RegisterSchema,Register);
apiRoute.post('/login',LoginSchema,Login);

//protectedRoutes

apiProtected.post(
    '/createTodo',
    [check("desc","Todo desc is required").exists()],
    createTodo
    );

apiProtected.post(
    '/marktodo',
    [check("todo_id","Todo id is required").exists()],
    MarkTodo
    );

apiProtected.post(
    '/deleteTodo',
    [check("todo_id","Todo id is required").exists()],
    RemoveTodo
    );

apiProtected.get(
    '/todolist',
    GetTodos
    );

module.exports = { apiRoute, apiProtected };
