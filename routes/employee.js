const router = require('express').Router();
const { verifyToken } = require('../middleware/auth');
// Import the user controller
const { empregister, emplogin, getemployee,updatemployee, deleteemployee, searchemployee ,getemployeeWithoutPagination} = require('../controller/employee_controller');

// The routes of the user controller

//register
router.get('/login', emplogin);

//login
router.post('/register', empregister);


// //update employee
router.put('/update', verifyToken,updatemployee);

// //delete employee
router.delete('/delete',verifyToken, deleteemployee);

// get employee
router.get('/get/:page',verifyToken, getemployee);


//no page pagenation
router.get('/get/nopage',verifyToken, getemployeeWithoutPagination);

//search employee
router.get('/search',verifyToken ,searchemployee);

module.exports = router;
