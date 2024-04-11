const { Router } = require('express');

const profileRoutes = new Router();

const { getProfile } = require('../controllers/profile.controller');

profileRoutes.get('/', getProfile);

module.exports = profileRoutes;
