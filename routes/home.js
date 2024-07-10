const { gethomerecord } = require('../controller/Home_controller');

const router = require('express').Router();


router.get('/get/number/orders',gethomerecord);


module.exports = router;