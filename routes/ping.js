const router = require('express').Router();

router.get('/ping', function(_req, res){
  res.send('wat')
})

module.exports = router;