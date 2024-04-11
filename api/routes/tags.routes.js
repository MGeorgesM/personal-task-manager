const express = require('express');
const router = express.Router();

const authMiddleware = require('../middlewares/auth.middleware');
const { createTag, getTags, updateTag, deleteTag } = require('../controllers/tags.controller');

router.post('/tags', authMiddleware, createTag);
router.get('/tags', authMiddleware, getTags);
router.put('/tags/:id', authMiddleware, updateTag);
router.delete('/tags/:id', authMiddleware, deleteTag);

module.exports = router;
