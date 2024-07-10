const router = require('express').Router();

// Import the user controller
const { addorder, getorderid, getorders, getstatusorders, getnumberrecord, updateorder, deleteorder, getcustomerorders, getemployeeorders, getmeasurementorder } = require('../controller/order_controller');

// The routes of the user controller

//add order
router.post('/add', addorder);


// //update order
router.put('/update', updateorder);

// //delete order
router.delete('/delete', deleteorder);

//get order id wise
router.get('/get/orderid', getorderid)

// get order
router.get('/get/:page', getorders);

//get status order
router.get('/get/status/order', getstatusorders);

//number order
router.get('/get/number/orders', getnumberrecord);

//search customer order
router.get('/get/customer/order/:page', getcustomerorders);

//search employee order
router.get('/get/employee/orders/:page', getemployeeorders);

//order id wise get order and measuremenet
router.get('/get/orderid/order/measurement',getmeasurementorder)

module.exports = router;
