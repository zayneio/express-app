const User = require('../model/User');
const registrationValidations = require('../validations/registrationValidations');

const registrationsController = class Controller {
  create = async (req, res) => {
    const { error } = registrationValidations(req.body);

    if (error){
      return res.status(400).send(error)
    } 

    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    })

    try {
      const savedUser = await user.save();
      return res.send(savedUser);
    } catch(err) {
      return res.status(400).send(err)
    }
  }
}

module.exports = registrationsController;