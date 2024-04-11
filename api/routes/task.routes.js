const express = require('express');
const router = express.Router();

const authMiddleware = require('../middlewares/auth.middleware');
const { createTask, getTasks, updateTask, deleteTask } = require('../controllers/task.controller');

router.post('/', authMiddleware, createTask);
router.get('/:columnId?', authMiddleware, getTasks);
router.put('/:id', authMiddleware, updateTask);
router.delete('/:id', authMiddleware, deleteTask);

module.exports = router;
