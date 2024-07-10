const { SECRET_KEY } = require('../config/config');
const jwt = require("jsonwebtoken")

const customerModel = require("../model/customer");
const registermodel = require("../model/tailor_user");
const orderModel = require("../model/order");
const employeeModel = require("../model/employee");
const inventoryModel = require("../model/inventory");
const { ENUMS } = require('../utils/enums');
const tailorModel = require("../model/tailor_user");
const admin = require("../model/admin");

exports.Adminlogin = async (req, res) => {
    const data = await admin.find({email:req.body.email})
    if (data != '') {
        if (data[0].password == req.body.password) {
            var accessToken = jwt.sign({ id: data[0].id, email: data[0].email }, SECRET_KEY);

            res.status(200).json({
                data,
                accessToken
            })
        } else {
            res.status(500).json({
                msg: 'already exit'
            })
        }
    } else {
        res.status(500).json({
            msg: 'email not'
        })
    }
    // res.json({data})
}

exports.getAllCustomer = async (req, res) => {
    try {
        const data = await customerModel.find();
        res.status(200).json({
            data
        })
    } catch (error) {
        res.status(404).json({
            status: false,
            message: ENUMS.CUSTOMER.SOMTHING_WENT_WRONG
        })
    }
}

exports.getAllOrder = async (req, res) => {
    try {
        const data = await orderModel.find();
        res.status(200).json({
            data
        })
        
    } catch (error) {
        res.status(404).json({
            status: false,
            message: ENUMS.ORDER.SOMTHING_WENT_WRONG
        })
        
    }
}

exports.getAllEmployee = async (req, res) => {
    try {
        const data = await employeeModel.find();
        res.status(200).json({
            data
        })
        
    } catch (error) {
        res.status(404).json({
            status: false,
            message: ENUMS.EMPLOYEE.SOMTHING_WENT_WRONG
        })
        
    }
}

exports.getAllInventory = async (req, res) => {
    try {
        const data = await inventoryModel.find();
        res.status(200).json({
            data
        })
        
    } catch (error) {
        res.status(404).json({
            status: false,
            message: ENUMS.INVENTORY.SOMTHING_WENT_WRONG
        })
        
    }
}

exports.getAllTailor = async (req, res) => {
    try {
        const data = await tailorModel.find();
        res.status(200).json({
            data
        })

    } catch (error) {
        res.status(404).json({
            status: false,
            message: ENUMS.INVENTORY.SOMTHING_WENT_WRONG
        })
        
    }
}

exports.customerfind = async (req, res) => {
    try {
        const data = await customerModel.find().populate('tailor_id');
        res.status(200).json({ data });
    } catch (error) {
        console.error("Error finding customers:", error);
        res.status(500).json({ status: false, message: "Internal server error" });
    }
}

exports.employeefind = async (req, res) => {
    try {
        const data = await employeeModel.find().populate('tailor_id');

        res.status(200).json({ data });
    } catch (error) {
        console.error("Error finding customers:", error);
        res.status(500).json({ status: false, message: "Internal server error" });
    }
}

exports.inventoryfind = async (req, res) => {
    try {
        const data = await inventoryModel.find().populate('tailor_id');
        res.status(200).json({ data });

    } catch (error) {
        console.error("Error finding Inventory:", error);
        res.status(500).json({ status: false, message: "Internal server error" });
    }
}


exports.orderfind = async (req, res) => {
    try {
        const data = await orderModel.find().populate('tailor_id').populate('customer_id');
        
        res.status(200).json({ data });

    } catch (error) {
        console.error("Error finding order:", error);
        res.status(500).json({ status: false, message: "Internal server error" });
    }
}






exports.customersByTailor = async (req, res) => {
    try {
        const tailorId = req.params.id;
        const customers = await customerModel.find({ tailor_id: tailorId });
        res.status(200).json({ status: true, customers });
    } catch (error) {
        console.error("Error finding customers by tailor:", error);
        res.status(500).json({ status: false, message: "Internal server error" });
    }
}

exports.employeeByTailor = async (req, res) => {
    try {
        const tailorId = req.params.id;
        const employees = await employeeModel.find({ tailor_id: tailorId });
        res.status(200).json({ status: true, employees });
    } catch (error) {
        console.error("Error finding employee by tailor:", error);
        res.status(500).json({ status: false, message: "Internal server error" });
    }
}

exports.inventoryByTailor = async (req, res) => {
    try {
        const tailorId = req.params.id;
        const inventory = await inventoryModel.find({ tailor_id: tailorId });

        res.status(200).json({ status: true, inventory });
    } catch (error) {
        console.error("Error finding inventory by tailor:", error);
        res.status(500).json({ status: false, message: "Internal server error" });
    }
}

exports.orderByTailor = async (req, res) => {
    try {
        const tailorId = req.params.id;
        const order = await orderModel.find({ tailor_id: tailorId });
        res.status(200).json({ status: true, order });
    } catch (error) {
        console.error("Error finding order by tailor:", error);
        res.status(500).json({ status: false, message: "Internal server error" });
    }
}


// exports.adminorders = async (req, res) => {
//     try {

//         const orderData = await orderModel.findOne({_id: req.query.id, is_deleted: false });

//         if (!orderData) {
//             return res.status(404).json({
//                 status: false,
//                 message: ENUMS.ORDER.ORDER_NOT_FOUND,
//             });
//         }

//         const customerData = await customerModel.findOne({ _id: orderData.customer_id });

//         if (!customerData) {
//             return res.status(404).json({
//                 status: false,
//                 message: ENUMS.CUSTOMER.CUSTOMER_NOT_FOUND,
//             });
//         }

//         const combinedData = {
//             order: orderData,
//             customer: customerData
//         };

//         res.status(200).json({
//             status: true,
//             message: ENUMS.ORDER.ORDER_DETAILS_FETCHED_SUCCESSFULLY,
//             data: combinedData,
//         });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({
//             status: false,
//             message: ENUMS.ORDER.SOMETHING_WENT_WRONG
//         });
//     }
// };

exports.adminorders = async (req, res) => {
    try {

        const orderData = await orderModel.findOne({_id: req.query.id, is_deleted: false });

        if (!orderData) {
            return res.status(404).json({
                status: false,
                message: ENUMS.ORDER.ORDER_NOT_FOUND,
            });
        }

        const userData = await registermodel.findOne({_id: orderData.tailor_id });

        if (!userData) {
            return res.status(404).json({
                status: false,
                message: ENUMS.USER.USER_NOT_FOUND,
            });
        }


        const customerData = await customerModel.findOne({ _id: orderData.customer_id });

        if (!customerData) {
            return res.status(404).json({
                status: false,
                message: ENUMS.CUSTOMER.CUSTOMER_NOT_FOUND,
            });
        }

        const combinedData = {
            order: orderData,
            customer: customerData,
            user : userData
        };

        res.status(200).json({
            status: true,
            message: ENUMS.ORDER.ORDER_DETAILS_FETCHED_SUCCESSFULLY,
            data: combinedData,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: false,
            message: ENUMS.ORDER.SOMETHING_WENT_WRONG
        });
    }
};