const express = require('express');
const router = express.Router();

const authMiddleware = require('../middlewares/auth.middleware');
const { createColumn, getColumns, updateColumn, deleteColumn } = require('../controllers/column.controller');

router.post('/', authMiddleware, createColumn);
router.get('/:boardId', authMiddleware, getColumns);
router.put('/:id', authMiddleware, updateColumn);
router.delete('/:id', authMiddleware, deleteColumn);

module.exports = router;