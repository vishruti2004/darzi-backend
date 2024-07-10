var express = require('express');
const { verifyToken } = require('../middleware/auth');
var router = express.Router();


// export function

exports.setup = function (app) {
    const user = require('./user');
    const inventory = require('./inventory');
    const customer = require('./customer');
    const customer_measurement = require('./customer_measurement');
    const measurement = require('./measurement');
    const employee = require('./employee');
    const order = require('./order');
    const homeC = require('./home');
    const admin = require('./admin');


    // user routes
    app.use('/api/inventory', verifyToken, inventory);
    app.use('/api/user', user);
    app.use('/api/customer', verifyToken, customer);
    app.use('/api/customer/measurement', verifyToken, customer_measurement);
    app.use('/api/measurement', verifyToken, measurement);
    app.use('/api/employee', employee);
    app.use('/api/order', verifyToken, order);
    app.use('/api/home', verifyToken, homeC);
    app.use('/api/admin',admin);
    



    // Custom function to be called when an error occurs
    async function handleRouteError(err, req, res, next) {
        console.error('Error occurred in route:', req.url);
        next(err); // Continue passing the error to the default error handler
    }

    // Error-handling middleware
    app.use(handleRouteError);

}

module.exports = exports;
