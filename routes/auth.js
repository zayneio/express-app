const router = require('express').Router();
const registrations = require('../controllers/auth/registrationsController');
const sessions = require('../controllers/auth/sessionsController');

router.post('/register', registrations.create)
router.post('/login', sessions.create)

module.exports = router;
