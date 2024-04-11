const express = require('express');
const router = express.Router();

const authMiddleware = require('../middlewares/auth.middleware');
const { getBoards, createBoard, updateBoard, deleteBoard } = require('../controllers/board.controller');

router.get('/boards/:id?', authMiddleware, getBoards);
router.post('/boards', authMiddleware, createBoard);
router.put('/boards/:id', authMiddleware, updateBoard);
router.delete('/boards/:id', authMiddleware, deleteBoard);

module.exports = router;