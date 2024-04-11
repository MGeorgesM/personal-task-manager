const express = require('express');
const router = express.Router();

const authMiddleware = require('../middlewares/auth.middleware');
const { getUser } = require('../controllers/user.controller');

router.get('/user', authMiddleware, getUser);

module.exports = router;