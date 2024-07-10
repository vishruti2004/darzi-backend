const orderModel = require("../model/order");
const customerModel = require("../model/customer");
const { ENUMS } = require('../utils/enums');
const customermeasurementModel = require("../model/customer_measurement");


exports.addorder = async (req, res) => {

    try {
        const { tailor_id, customer_id, employee_id, due_date, order_date, status, payment_value, orders } = req.body;
        if (
            !tailor_id ||
            !customer_id ||
            !employee_id ||
            !due_date ||
            !order_date ||
            !status ||
            !payment_value ||
            !orders
        ) {
            res.status(400).json({
                status: false,
                message: ENUMS.ORDER.FIELD_REQUIRED
            })
        } else {

            var datetime = new Date();
            var user = {

                tailor_id: req.body.tailor_id,
                customer_id: req.body.customer_id,
                employee_id: req.body.employee_id,
                due_date: req.body.due_date,
                order_date: req.body.order_date,
                status: req.body.status,
                payment_value: req.body.payment_value,
                orders: req.body.orders

            };
            user.created_at = datetime;
            user.updated_at = datetime;
            user.is_deleted = false;
            const data = await orderModel.create(user);

            res.status(200).json({
                status: true,
                message: ENUMS.ORDER.DATA_INSERT_SUCCESS,
                id: data._id,
                customer_id: data.customer_id,
                tailor_id: data.tailor_id,
                employee_id: data.employee_id,
                due_date: data.due_date,
                order_date: data.order_date,
                status: data.status,
                payment_value: data.payment_value,
                orders: data.orders
            });

        }
    } catch (error) {
        res.status(404).json({
            status: false,
            message: ENUMS.ORDER.SOMTHING_WENT_WRONG
        })

    }
}




exports.getorders = async (req, res) => {
    try {
        if (!req.body.tailor_id) {
            return res.status(400).json({
                status: false,
                message: ENUMS.ORDER.TAILOR_ID_REQUIRED,
            });
        }

        const page = req.params.page;
        const limit = 10;
        const skip = (page - 1) * limit;

        const orderData = await orderModel.find({ tailor_id: req.body.tailor_id, is_deleted: false, status: req.body.status })
            .sort({ _id: -1 })
            .limit(limit)
            .skip(skip);

        const customerIds = orderData.map(order => order.customer_id);

        const customerData = await customerModel.find({ _id: { $in: customerIds } });

        const combinedData = orderData.map(order => {
            const customer = customerData.find(cust => cust._id.equals(order.customer_id));
            return {
                order: order,
                customer_name: customer.customer_name,
                email: customer.email,
                mobile: customer.mobile,
                gender: customer.gender,
                address: customer.address
            };
        });

        res.status(200).json({
            status: true,
            message: ENUMS.ORDER.ORDER_DETAILS_FETCHED_SUCCESSFULLY,
            data: combinedData,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: false,
            message: ENUMS.ORDER.SOMTHING_WENT_WRONG
        });
    }
};


exports.getnumberrecord = async (req, res) => {
    try {
        if (!req.body.tailor_id) {
            return res.status(400).json({
                status: false,
                message: ENUMS.ORDER.TAILOR_ID_REQUIRED,
            });
        }

        const orderData = await orderModel.find({ tailor_id: req.body.tailor_id }).limit(3)
        const customerdata = await customerModel.find({ tailor_id: req.body.tailor_id, is_deleted: false }).limit(3);


        const customerIds = orderData.map(order => order.customer_id);

        const customerData = await customerModel.find({ _id: { $in: customerIds } });

        const combinedData = orderData.map(order => {
            const customer = customerData.find(cust => cust._id.equals(order.customer_id));
            return {
                order: order,
                customer_name: customer.customer_name,
                email: customer.email,
                mobile: customer.mobile,
                gender: customer.gender,
                address: customer.address
            };
        });

        res.status(200).json({
            status: true,
            message: ENUMS.ORDER.ORDER_DETAILS_FETCHED_SUCCESSFULLY,
            data: combinedData,
            cdata: customerdata
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: false,
            message: ENUMS.ORDER.SOMTHING_WENT_WRONG
        });
    }
};





exports.getcustomerorders = async (req, res) => {
    try {
        if (!req.body.customer_id) {
            return res.status(400).json({
                status: false,
                message: ENUMS.ORDER.CUSTOMER_ID_REQUIRED,
            });
        }

        const page = req.params.page;
        const limit = 10;
        const skip = (page - 1) * limit;

        const orderData = await orderModel.find({ customer_id: req.body.customer_id, is_deleted: false })
            .sort({ _id: -1 })
            .limit(limit)
            .skip(skip);

        const customerIds = orderData.map(order => order.customer_id);

        const customerData = await customerModel.find({ _id: { $in: customerIds } });

        const combinedData = orderData.map(order => {
            const customer = customerData.find(cust => cust._id.equals(order.customer_id));
            return {
                order: order,
                customer_name: customer.customer_name,
                email: customer.email,
                mobile: customer.mobile,
                gender: customer.gender,
                address: customer.address
            };
        });

        res.status(200).json({
            status: true,
            message: ENUMS.ORDER.ORDER_DETAILS_FETCHED_SUCCESSFULLY,
            data: combinedData,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: false,
            message: ENUMS.ORDER.SOMTHING_WENT_WRONG
        });
    }
};

exports.getemployeeorders = async (req, res) => {
    try {
        if (!req.body.employee_id) {
            return res.status(400).json({
                status: false,
                message: ENUMS.ORDER.EMPLOYEE_ID_REQUIRED,
            });
        }

        const page = req.params.page;
        const limit = 10;
        const skip = (page - 1) * limit;

        const orderData = await orderModel
            .find({ employee_id: req.body.employee_id, is_deleted: false })
            .sort({ _id: -1 })
            .limit(limit)
            .skip(skip);
        const customerIds = orderData.map(order => order.customer_id);

        const customerData = await customerModel.find({ _id: { $in: customerIds } });

        const combinedData = orderData.map(order => {
            const customer = customerData.find(cust => cust._id.equals(order.customer_id));
            return {
                order: order,
                customer_name: customer.customer_name,
                email: customer.email,
                mobile: customer.mobile,
                gender: customer.gender,
                address: customer.address
            };
        });

        res.status(200).json({
            status: true,
            message: ENUMS.ORDER.ORDER_DETAILS_FETCHED_SUCCESSFULLY,
            data: combinedData,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: false,
            message: ENUMS.ORDER.SOMTHING_WENT_WRONG
        });
    }
};

exports.getstatusorders = async (req, res) => {
    try {
        if (!req.body.employee_id || !req.body.status) {
            return res.status(400).json({
                status: false,
                message: ENUMS.ORDER.EMPLOYEE_ID_REQUIRED,
            });
        }

        const orderData = await orderModel
            .find({ employee_id: req.body.employee_id, status: req.body.status, is_deleted: false })


        res.status(200).json({
            status: true,
            message: ENUMS.ORDER.ORDER_DETAILS_FETCHED_SUCCESSFULLY,
            data: orderData,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: false,
            message: ENUMS.ORDER.SOMTHING_WENT_WRONG
        });
    }
};



exports.updateorder = async (req, res) => {
    try {
        if (!req.body.id) {
            return res.status(400).json({
                status: false,
                message: ENUMS.ORDER.ORDER_ID_REQUIRED,
            });
        } else {
            req.body.updated_at = Date.now();

            await orderModel.findByIdAndUpdate(req.body.id, req.body);

            const updatedorder = await orderModel.findById(req.body.id);

            res.status(200).json({
                status: ENUMS.ORDER.ORDER_STATUS_UPDATE_SUCCESSFULLY,
                result: {
                    id: updatedorder._id,
                    customer_id: updatedorder.customer_id,
                    employee_id: updatedorder.employee_id,
                    status: updatedorder.status,
                    due_date: updatedorder.due_date,
                    order_date: updatedorder.order_date,
                    payment_value: updatedorder.payment_value,
                    orders: updatedorder.orders,
                    updated_at: updatedorder.updated_at,
                },
            });
        }
    } catch (error) {
        console.error(error);
        return res.status(404).json({
            status: false,
            message: ENUMS.ORDER.SOMTHING_WENT_WRONG
        });
    }
};


exports.deleteorder = async (req, res) => {
    try {
        const updateid = { _id: req.body.id };

        const updateFields = {
            $set: {
                is_deleted: true,
                updated_at: req.body.updated_at || Date.now(),
            },
        };

        const deleteorder = await orderModel.findOneAndUpdate(
            updateid,
            updateFields,

            { new: true }
        );

        if (!deleteorder) {
            return res.status(404).json({
                status: false,
                message: ENUMS.ORDER.ORDER_NOT_FOUND,
            });
        }

        res.status(200).json({
            status: true,
            message: ENUMS.ORDER.ORDER_STATUS_DELETE_SUCCESSFULLY,
            // deletedInventory: deleteinventory,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: false,
            message: ENUMS.ORDER.SOMTHING_WENT_WRONG
        });
    }
};




exports.getorderid = async (req, res) => {
    try {

        if (!req.body._id) {
            res.status(400).json({
                status: false,
                message: ENUMS.ORDER.FIELD_REQUIRED,
            });
        }
        else {
            const data = await orderModel.find({ _id: req.body._id, is_deleted: false });


            res.status(200).json({
                data,
                status: true,
                message: ENUMS.ORDER.ORDER_DETAILS_FETCHED_SUCCESSFULLY,
            });
        }
    }
    catch (error) {
        res.status(404).json({
            status: false,
            message: ENUMS.ORDER.SOMTHING_WENT_WRONG
        })

    }
}


// exports.getmeasurementorder = async (req, res) => {
//     try {
//         if (!req.body._id) {
//             return res.status(400).json({
//                 status: false,
//                 message: ENUMS.ORDER.ORDER_ID_REQUIRED,
//             });
//         }

//         const orderData = await orderModel.findOne({ _id: req.body._id, is_deleted: false });
//         if (orderData) {
            
//             const measurementIds = orderData.orders[0].customer_measurement_id;
//             console.log( measurementIds);
//             const measurementData = await customermeasurementModel.find({ _id: { $in: measurementIds } });
//             const combinedData = measurementData.map(customer_measurement => ({
//                 order: orderData,
//                 measurement_name: customer_measurement.measurement_name,
//                 tailor_id: customer_measurement.tailor_id,
//                 customer_id: customer_measurement.customer_id,
//                 customer_measurement_id: customer_measurement._id,
//                 date: customer_measurement.date,
//                 measurement_type: customer_measurement.measurement_type,
//                 measurement_values: customer_measurement.measurement_values,
//             }));


//             res.status(200).json({
//                 status: true,
//                 message: ENUMS.ORDER.ORDER_DETAILS_FETCHED_SUCCESSFULLY,
//                 data: combinedData,
//             });
//         } else {
//             return res.status(404).json({
//                 status: false,
//                 message: ENUMS.ORDER.ORDER_NOT_FOUND,
//             });

//         }
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({
//             status: false,
//             message: ENUMS.ORDER.SOMETHING_WENT_WRONG
//         });
//     }
// };



// exports.getmeasurementorder = async (req, res) => {
//     try {
//         if (!req.body._id) {
//             return res.status(400).json({
//                 status: false,
//                 message: ENUMS.ORDER.ORDER_ID_REQUIRED,
//             });
//         }

//         const orderData = await orderModel.findOne({ _id: req.body._id, is_deleted: false });
//         if (orderData) {
//             const measurementIds = orderData.orders.map(order => order.customer_measurement_id);
//             const measurementData = await customermeasurementModel.find({ _id: { $in: measurementIds } });
            
//             const combinedData = orderData.orders.map(order => {
//                 const measurement = measurementData.find(measurement => measurement._id.toString() === order.customer_measurement_id);
//                 return {
//                     order: orderData,
//                     measurement_values: measurement.measurement_values,
//                 };
//             });

//             res.status(200).json({
//                 status: true,
//                 message: ENUMS.ORDER.ORDER_DETAILS_FETCHED_SUCCESSFULLY,
//                 data: combinedData,
//             });
//         } else {
//             return res.status(404).json({
//                 status: false,
//                 message: ENUMS.ORDER.ORDER_NOT_FOUND,
//             });

//         }
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({
//             status: false,
//             message: ENUMS.ORDER.SOMETHING_WENT_WRONG
//         });
//     }
// };


exports.getmeasurementorder = async (req, res) => {
    try {
        if (!req.body._id) {
            return res.status(400).json({
                status: false,
                message: ENUMS.ORDER.ORDER_ID_REQUIRED,
            });
        }

        const orderData = await orderModel.findOne({ _id: req.body._id, is_deleted: false });
        if (orderData) {
            const measurementIds = orderData.orders.map(order => order.customer_measurement_id);
            const measurementData = await customermeasurementModel.find({ _id: { $in: measurementIds } });
            const measurementMap = new Map();

            measurementData.forEach(measurement => {
                measurementMap.set(measurement._id.toString(), measurement.measurement_values);
            });

            const combinedData = orderData.orders.map(order => {
                const measurementValues = measurementMap.get(order.customer_measurement_id);
                return {
                    ...order,
                    measurement_values: measurementValues,
                };
            });

            const updatedOrderData = {
                ...orderData.toObject(),
                orders: combinedData,
            };

            res.status(200).json({
                status: true,
                message: ENUMS.ORDER.ORDER_DETAILS_FETCHED_SUCCESSFULLY,
                data: [updatedOrderData],
            });
        } else {
            return res.status(404).json({
                status: false,
                message: ENUMS.ORDER.ORDER_NOT_FOUND,
            });

        }
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: false,
            message: ENUMS.ORDER.SOMETHING_WENT_WRONG
        });
    }
};

