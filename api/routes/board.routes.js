const express = require('express');
const router = express.Router();

const authMiddleware = require('../middlewares/auth.middleware');
const { getBoards, createBoard, updateBoard, deleteBoard } = require('../controllers/board.controller');

router.get('/:id?', authMiddleware, getBoards);
router.post('/', authMiddleware, createBoard);
router.put('/:id', authMiddleware, updateBoard);
router.delete('/:id', authMiddleware, deleteBoard);

module.exports = router;