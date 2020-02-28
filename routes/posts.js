const router = require('express').Router();
const verify = require('./verifyToken');
const posts = require('../controllers/postsController');

router.get('/', verify, posts.index);

module.exports = router;