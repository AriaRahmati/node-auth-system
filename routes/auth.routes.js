const { Router } = require('express');

const authRoutes = new Router();

const { login, register } = require('../controllers/auth.controller');

authRoutes.post('/login', login);
authRoutes.post('/register', register);

module.exports = authRoutes;
