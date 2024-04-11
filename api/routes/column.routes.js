const express = require('express');
const router = express.Router();

const authMiddleware = require('../middlewares/auth.middleware');
const { createColumn, getColumns, updateColumn, deleteColumn } = require('../controllers/column.controller');

router.post('/columns', authMiddleware, createColumn);
router.get('/columns/:boardId', authMiddleware, getColumns);
router.put('/columns/:id', authMiddleware, updateColumn);
router.delete('/columns/:id', authMiddleware, deleteColumn);

module.exports = router;