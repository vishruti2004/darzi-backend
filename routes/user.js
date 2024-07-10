const router = require('express').Router();

// Import the user controller
const { register,login,sendotp, verifyotp, updateUser,deleteUser,changePassword,sendotppassword } = require('../controller/user');

// The routes of the user controller

// Register a new user
router.post('/register',register);

// Login a user
router.get('/login', login);

//send otp
router.post('/sendotp',sendotp);

//verify otp
router.get('/verifyotp',verifyotp);

//update user
router.put('/update',updateUser);

//delete user
router.delete('/delete',deleteUser);

//change password
router.post('/change/password',changePassword);

router.post('/send/otp/password',sendotppassword);


module.exports = router;
