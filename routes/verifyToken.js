const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
  console.log('verifying...')

  const token = req.header('AUTH-TOKEN');
  if(!token) return res.status(401).send('Access Denied.');

  console.log('token', token)

  try{
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    console.log('verified', verified)
    req.user = verified;
    next();
  }catch{
    res.status(400).send('Invalid Token')
  }
}