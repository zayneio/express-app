const router = require('express').Router();
const registrations = require('../app/controllers/auth/registrationsController');
const sessions = require('../app/controllers/auth/sessionsController');

router.post('/register', registrations.create)
router.post('/login', sessions.create)

module.exports = router;
