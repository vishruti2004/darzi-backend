const router = require('express').Router();

// Import the user controller
const { addcustomermeasurement,getcustomermeasurement,measurementsnopage,updatecustomermeasurement,deletecustomermeasurement,searchcustomermeasurement,} = require('../controller/customer_measurement_controller');

// The routes of the user controller

//add customermeasurement
router.post('/add',addcustomermeasurement);

// //update customermeasurement
router.put('/update',updatecustomermeasurement);

// //delete customermeasurement
router.delete('/delete',deletecustomermeasurement);

// get customermeasurement
router.get('/get/:page',getcustomermeasurement);

//search customermeasurement
router.get('/search',searchcustomermeasurement);

//no page pagenation
router.get('/get/nopage',measurementsnopage);


module.exports = router;
