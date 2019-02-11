var express = require('express');
var router = express.Router();
var User  = require('../controllers/user.js')

/* GET users listing. */
router.post('/sendOtp',User.sendOtp);
router.post('/sent',User.sent);
router.post('/userProfile',User.userProfile);







module.exports = router;
