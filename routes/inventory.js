const router = require('express').Router();

// Import the user controller
const { addinventory,updateinventory,deleteinventory,getinventory,searchinventory} = require('../controller/inventory_controller');

// The routes of the user controller

//add inventory
router.post('/add',addinventory);

// //update user
router.put('/update',updateinventory);

// //delete user
router.delete('/delete',deleteinventory);

// get inventory
router.get('/get/:page',getinventory);

//search inventory
router.get('/search',searchinventory);

module.exports = router;
