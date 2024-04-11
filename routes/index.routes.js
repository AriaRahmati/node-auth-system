const { Router } = require('express');

const authRoutes = require('./auth.routes');
const profileRoutes = require('./profile.routes');

const checkAuth = require('../middlewares/authCheck.middleware');

const router = new Router();

router.use('/auth', authRoutes);
router.use('/profile', checkAuth, profileRoutes);

module.exports = router;
