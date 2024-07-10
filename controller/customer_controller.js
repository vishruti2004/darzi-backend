const customerModel = require("../model/customer");
const customerMeasurementModel = require("../model/customer_measurement");
const orderModel = require("../model/order");
const { ENUMS } = require('../utils/enums');


exports.addcustomer = async (req, res) => {
    try {
        const { customer_name, email, mobile, address, gender, tailor_id } = req.body;

        if (
            !customer_name ||
            !email ||
            !mobile ||
            !tailor_id ||
            !address ||
            !gender
        ) {
            res.status(400).json({
                status: false,
                message: ENUMS.CUSTOMER.FIELD_REQUIRED
            })
        }

        else {

            var datetime = new Date();
            var customer = {
                customer_name: req.body.customer_name,
                tailor_id: req.body.tailor_id,
                email: req.body.email,
                mobile: req.body.mobile,
                address: req.body.address,
                gender: req.body.gender,
            };
            customer.created_at = datetime;
            customer.updated_at = datetime;
            customer.is_deleted = false;

            const data = await customerModel.create(customer);
            res.status(200).json({
                status: true,
                message: ENUMS.CUSTOMER.DATA_INSERT_SUCCESS,
                id: data._id,
                customer_name: data.customer_name,
                tailor_id: data.tailor_id,
                email: data.email,
                mobile: data.mobile,
                address: data.address,
                gender: data.gender
            });

        }
    } catch (error) {
        res.status(404).json({
            status: false,
            message: ENUMS.CUSTOMER.SOMTHING_WENT_WRONG
        })

    }
}

exports.getcustomer = async (req, res) => {
    try {

        if (!req.body.tailor_id) {
            res.status(400).json({
                status: false,
                message: ENUMS.CUSTOMER.TAILOR_ID_REQUIRED,
            });
        }
        else {
            var page = req.params.page
            var limit = 10;
            var skip = (page - 1) * limit
            const data = await customerModel.find({ tailor_id: req.body.tailor_id, is_deleted: false }).sort({ _id: -1 }).limit(limit).skip(skip);
            res.status(200).json({
                status: true,
                message: ENUMS.CUSTOMER.GET_DATA_SUCCESSFULLY,
                data
            });
        }
    }


    catch (error) {
        res.status(404).json({
            status: false,
            message: ENUMS.CUSTOMER.SOMTHING_WENT_WRONG
        })
        
    }
}

// exports.getAllCustomer = async (req, res) => {
//     try {
//         const data = await customerModel.find();
//         res.status(200).json({
//             data
//         })
//     } catch (error) {
//         res.status(404).json({
//             status: false,
//             message: ENUMS.CUSTOMER.SOMTHING_WENT_WRONG
//         })
//         console.log(error)
//     }
// }

exports.updatecustomer = async (req, res) => {
    try {
        if (!req.body.id) {
            return res.status(400).json({
                status: false,
                message: ENUMS.CUSTOMER.CUSTOMER_ID_REQUIRED,
            });
        } else {
            const { id, ...updateData } = req.body;

            req.body.updated_at = Date.now();

            await customerModel.findByIdAndUpdate(req.body.id, req.body);

            const updatecustomer = await customerModel.findById(req.body.id);

            res.status(200).json({
                status: ENUMS.CUSTOMER.CUSTOMER_STATUS_UPDATE_SUCCESSFULLY,
                result: {
                    id: updatecustomer._id,
                    customer_name: updatecustomer.customer_name,
                    mobile: updatecustomer.mobile,
                    address: updatecustomer.address,
                    gender: updatecustomer.gender,
                    updated_at: updatecustomer.updated_at,
                },
            });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: false,
            message: ENUMS.CUSTOMER.SOMTHING_WENT_WRONG
        });
    }
};



exports.deletecustomer = async (req, res) => {
    try {
        if (!req.body.id) {
            return res.status(400).json({
                status: false,
                message: ENUMS.CUSTOMER.CUSTOMER_ID_REQUIRED,
            });
        }

        const customerId = req.body.id;

        // Update customer table
        const updateCustomerFields = {
            is_deleted: true,
            updated_at: req.body.updated_at || Date.now(),
        };

        const deletedCustomer = await customerModel.findOneAndUpdate(
            { _id: customerId },
            updateCustomerFields,
            { new: true }
        );

        if (!deletedCustomer) {
            return res.status(404).json({
                status: false,
                message: ENUMS.CUSTOMER.CUSTOMER_NOT_FOUND,
            });
        }

        // Update customer_measurement table
        await customerMeasurementModel.updateMany(
            { customer_id: customerId },
            {
                $set: {
                    is_deleted: true,
                    updated_at: req.body.updated_at || Date.now(),
                },
            }
        );

        // Update order table
        await orderModel.updateMany(
            { customer_id: customerId },
            {
                $set: {
                    is_deleted: true,
                    updated_at: req.body.updated_at || Date.now(),
                },
            }
        );

        res.status(200).json({
            status: true,
            message: ENUMS.CUSTOMER.CUSTOMER_STATUS_DELETE_SUCCESSFULLY,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: false,
            message: ENUMS.CUSTOMER.SOMTHING_WENT_WRONG
        });
    }
};


exports.searchcustomer = async (req, res) => {
    try {
        if (!req.body.tailor_id) {
            res.status(400).json({
                status: false,
                message: ENUMS.CUSTOMER.TAILOR_ID_REQUIRED,
            });
        } else {
            // Validate tailor_id
            const isValidTailorId = await validateTailorId(req.body.tailor_id);

            if (!isValidTailorId) {
                res.status(404).json({
                    status: false,
                    message: ENUMS.CUSTOMER.INVALID_TAILOR_iD,
                });
                return;
            }
            const data = await customerModel.find({
                tailor_id: req.body.tailor_id,
                is_deleted: false,
                $or: [
                    { "customer_name": { $regex: req.body.value } },
                    { "email": { $regex: req.body.value } },
                    { "mobile": { $regex: req.body.value } },

                ]
            }).sort({ _id: -1 });

            
            res.status(200).json({
                status: true,
                message: ENUMS.CUSTOMER.GET_DATA_SUCCESSFULLY,
                data
            });
        }
    } catch (error) {
        res.status(500).json({
            status: false,
            message: ENUMS.CUSTOMER.SOMTHING_WENT_WRONG,
            error: error.message
        });
        console.error(error);
    }
};
async function validateTailorId(tailorId) {
    try {
        const existingTailor = await customerModel.findOne({ tailor_id: tailorId, is_deleted: false });
        return !!existingTailor;
    } catch (error) {
        console.error("Error validating tailor_id:", error);
        return false;
    }
}