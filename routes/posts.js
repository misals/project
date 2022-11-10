const express = require('express');
const router = express.Router();

const postController = require('../controllers/posts_controller');
const { route } = require('./users');

router.post('/create', postController.create);

module.exports = router;