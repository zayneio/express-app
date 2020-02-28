const router = require('express').Router();
const verify = require('./verifyToken');
const posts = require('../controllers/postsController');

router.get('/', verify, posts.index);
router.post('/', verify, posts.create);
router.get('/:id', verify, posts.show);

module.exports = router;