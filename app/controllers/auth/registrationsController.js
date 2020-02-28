const User = require('../../model/User');
const validations = require('../../validations/registrationValidations');
const bcrypt = require('bcryptjs');

exports.create = async function(req, res) {  
  const { error } = validations(req.body);

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
};
