const User = require('../../model/User');
const validations = require('../../validations/loginValidations');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


exports.create =  async (req, res) => {
  const { error } = validations(req.body);
  
  // Return error with 400 response if the req does not pass validations
  if (error) {
    return res.status(400).send(error)
  }

  // Check if we have the user in our db
  const user = await User.findOne({email: req.body.email});
  if (!user) return res.status(400).send('Email or password is invalid');

  const validPass = await bcrypt.compare(req.body.password, user.password);
  if(!validPass) return res.status(400).send('Email or password is invalid');

  // Create and assign a JWT token
  const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET)
  res.header('AUTH-TOKEN', token).send(token)
};