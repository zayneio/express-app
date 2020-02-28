const router = require('express').Router();
const User = require('../model/User');
const registrationValidations = require('../validations/registrationValidations');
const loginValidations = require('../validations/loginValidations');
const bcrypt = require('bcryptjs');

router.post('/register', async function(req, res) {  
  const { error } = registrationValidations(req.body);

  if (error) {
    return res.status(400).send(error)
  }

  // Check if the email already exists in our database
  const emailExists = await User.findOne({email: req.body.email});
  if (emailExists) return res.status(400).send('Email already exists');

  // Hash the password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword
  })

  try {
    const savedUser = await user.save();
    res.send({user: savedUser._id});
  } catch(err) {
    res.status(400).send(err)
  }
})

router.post('/login', async (req, res) => {
  const { error } = loginValidations(req.body);
  
  // Return error with 400 response if the req does not pass validations
  if (error) {
    return res.status(400).send(error)
  }

  // Check if we have the user in our db
  const user = await User.findOne({email: req.body.email});
  if (!user) return res.status(400).send('Email or password is invalid');

  const validPass = await bcrypt.compare(req.body.password, user.password);
  if(!validPass) return res.status(400).send('Email or password is invalid');

  res.send('Login')
})

module.exports = router;