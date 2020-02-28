const router = require('express').Router();
const verify = require('./verifyToken');

router.get('/', verify, (req, res) => {
  res.json({
    posts: [
      { 
        title: 'Post 1', 
        descripiton: 'this post is private.' 
      },
      { 
        title: 'Post 2', 
        descripiton: 'this post is also private.' 
      },
    ]
  })
});

module.exports = router;