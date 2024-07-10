const router = require('express').Router();

// Import the user controller
const { addcustomer,getcustomer,updatecustomer,deletecustomer,searchcustomer, getAllCustomer} = require('../controller/customer_controller');
const { verifyToken } = require('../middleware/auth');

// The routes of the user controller

//add customer
router.post('/add',verifyToken,addcustomer);

// //update customer
router.put('/update',verifyToken,updatecustomer);

// //delete customer
router.delete('/delete',verifyToken,deletecustomer);

// get customer
// router.get('/allCustomer',getAllCustomer);
router.get('/get/:page',verifyToken,getcustomer);

//search customer
router.get('/search',searchcustomer);

module.exports = router;
