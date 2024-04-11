const express = require('express');
const router = express.Router();

const authMiddleware = require('../middlewares/auth.middleware');
const { createTag, getTags, updateTag, deleteTag } = require('../controllers/tags.controller');

router.post('/', authMiddleware, createTag);
router.get('/', authMiddleware, getTags);
router.put('/:id', authMiddleware, updateTag);
router.delete('/:id', authMiddleware, deleteTag);

module.exports = router;
