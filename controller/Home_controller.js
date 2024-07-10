const orderModel = require("../model/order");
const customerModel = require("../model/customer");
const { ENUMS } = require('../utils/enums');


exports.gethomerecord = async (req, res) => {
    try {
        if (!req.body.tailor_id) {
            return res.status(400).json({
                status: false,
                message: ENUMS.ORDER.TAILOR_ID_REQUIRED,
            });
        }


        const customerdata = await customerModel.find({ tailor_id: req.body.tailor_id, is_deleted: false }).limit(3);

        const orderData = await orderModel.find({ tailor_id: req.body.tailor_id, is_deleted: false }).limit(3)

        const customerIds = orderData.map(order => order.customer_id);

        const customerDataList = await customerModel.find({ _id: { $in: customerIds } });

        const combinedData = orderData.map(order => {
            const customer = customerDataList.find(cust => cust._id.equals(order.customer_id));
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
            order_data: combinedData,
            customer_data: customerdata
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: false,
            message: ENUMS.ORDER.SOMTHING_WENT_WRONG
        });
    }
};



