const router = require('express').Router();

// Import the user controller
const { addmeasurement, updatemeasurement, deletemeasurement, getmeasurement, getmeasurementWithoutPagination,searchmeasurement } = require('../controller/measurement_controller');

// The routes of the user controller

//add customer
router.post('/add', addmeasurement);

// //update customer
router.put('/update', updatemeasurement);

// //delete customer
router.delete('/delete', deletemeasurement);

// get customer
router.get('/get/:page', getmeasurement);

//get measurment without pagination
router.get('/get/nopage', getmeasurementWithoutPagination);

//search measurement
router.get('/search/measurement',searchmeasurement);

module.exports = router;
