var express = require('express');
var router = express.Router();
// Require our controllers.
var authentication_controller = require('../controllers/AuthenticationController');

/// ROUTES ///

// POST request for creating real estate.
router.post('/login', authentication_controller.login);

// POST request to delete real estate
router.post('/register', authentication_controller.register);

// POST request for user data
router.post('/profile', authentication_controller.profile);

module.exports = router;