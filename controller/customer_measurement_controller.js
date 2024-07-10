const customer_measurementModel = require("../model/customer_measurement");
const { ENUMS } = require('../utils/enums');

exports.addcustomermeasurement = async (req, res) => {

    try {
        const { tailor_id, customer_id, measurement_name, measurement_type, measurement_values, measurement_id } = req.body;
        if (
            !tailor_id ||
            !customer_id ||
            !measurement_name ||
            !measurement_values ||
            !measurement_type ||
            !measurement_id
        ) {
            res.status(400).json({
                status: false,
                message: ENUMS.CUSTOMER_MEASUREMENT.FIELD_REQUIRED
            })
        } else {

            var datetime = new Date();
            var user = {

                tailor_id: req.body.tailor_id,
                customer_id: req.body.customer_id,
                measurement_name: req.body.measurement_name,
                measurement_type: req.body.measurement_type,
                measurement_values: req.body.measurement_values,
                measurement_id: req.body.measurement_id
            };
            user.created_at = datetime;
            user.updated_at = datetime;
            user.is_deleted = false;

            const data = await customer_measurementModel.create(user);
            res.status(200).json({
                status: true,
                message: ENUMS.CUSTOMER_MEASUREMENT.DATA_INSERT_SUCCESS,
                id: data._id,
                customer_id: data.customer_id,
                tailor_id: data.tcustomer_id,
                measurement_name: data.measurement_name,
                measurement_type: data.measurement_type,
                measurement_values: data.measurement_values,
                measurement_id: data.measurement_id
            });

        }
    } catch (error) {
        res.status(404).json({
            status: false,
            message: ENUMS.CUSTOMER_MEASUREMENT.SOMTHING_WENT_WRONG
        })
        
    }
}

exports.getcustomermeasurement = async (req, res) => {
    try {

        if (!req.body.customer_id) {
            res.status(400).json({
                status: false,
                message: ENUMS.CUSTOMER_MEASUREMENT.FIELD_REQUIRED
            });
        }
        else {
            var page = req.params.page
            var limit = 10;
            var skip = (page - 1) * limit
            const data = await customer_measurementModel.find({ customer_id: req.body.customer_id, is_deleted: false }).sort({ _id: -1 }).limit(limit).skip(skip);
            res.status(200).json({
                status: true,
                message: ENUMS.CUSTOMER_MEASUREMENT.CUSTOMER_MEASUREMENT_DETAILS_FETCHED_SUCCESSFULLY,
                data
            });
        }
    }


    catch (error) {
        res.status(404).json({
            status: false,
            message: ENUMS.CUSTOMER_MEASUREMENT.SOMTHING_WENT_WRONG
        })
        
    }
}


exports.measurementsnopage = async (req, res) => {
    try {

        if (!req.body.customer_id) {
            res.status(400).json({
                status: false,
                message: ENUMS.CUSTOMER_MEASUREMENT.FIELD_REQUIRED
            });
        }
        else {

            const data = await customer_measurementModel.find({ customer_id: req.body.customer_id, is_deleted: false }).sort({ _id: -1 });
            res.status(200).json({
                status: true,
                message: ENUMS.CUSTOMER_MEASUREMENT.CUSTOMER_MEASUREMENT_DETAILS_FETCHED_SUCCESSFULLY,
                data
            });
        }
    }


    catch (error) {
        res.status(404).json({
            status: false,
            message: ENUMS.CUSTOMER_MEASUREMENT.SOMTHING_WENT_WRONG
        })
    }
}

exports.updatecustomermeasurement = async (req, res) => {
    try {
        if (!req.body.id) {
            return res.status(400).json({
                status: false,
                message: ENUMS.CUSTOMER_MEASUREMENT.CUSTOMER_MEASUREMENT_ID_REQUIRED,
            });
        } else {
            req.body.updated_at = Date.now();

            await customer_measurementModel.findByIdAndUpdate(req.body.id, req.body);

            const updatecustomermeasurement = await customer_measurementModel.findById(req.body.id);

            res.status(200).json({
                status: ENUMS.CUSTOMER_MEASUREMENT.CUSTOMER_MEASUREMENT_STATUS_UPDATE_SUCCESSFULLY,
                result: {
                    id: updatecustomermeasurement._id,
                    measurement_id: updatecustomermeasurement.measurement_id,
                    measurement_name: updatecustomermeasurement.measurement_name,
                    measurement_type: updatecustomermeasurement.measurement_type,
                    measurement_values: updatecustomermeasurement.measurement_values,
                    updated_at: updatecustomermeasurement.updated_at,
                },
            });
        }
    } catch (error) {
        return res.status(404).json({
            status: false,
            message: ENUMS.CUSTOMER_MEASUREMENT.SOMTHING_WENT_WRONG
        });
    }
};

exports.deletecustomermeasurement = async (req, res) => {
    try {
        const updateid = req.body.id;

        const updateFields = {
            $set: {
                is_deleted: true,
                updated_at: req.body.updated_at || Date.now(),
            },
        };

        const deletecustomermeasurement = await customer_measurementModel.findOneAndUpdate(
            updateid,
            updateFields,
            { new: true }
        );

        if (!deletecustomermeasurement) {
            return res.status(404).json({
                status: false,
                message: ENUMS.CUSTOMER_MEASUREMENT.CUSTOMER_MEASUREMENT_NOT_FOUND
            });
        }

        res.status(200).json({
            status: true,
            message: ENUMS.CUSTOMER_MEASUREMENT.CUSTOMER_MEASUREMENT_STATUS_DELETE_SUCCESSFULLY,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: false,
            message: ENUMS.CUSTOMER_MEASUREMENT.SOMTHING_WENT_WRONG
        });
    }
};



exports.searchcustomermeasurement = async (req, res) => {
    try {
        if (!req.body.customer_id) {
            res.status(400).json({
                status: false,
                message: ENUMS.CUSTOMER_MEASUREMENT.CUSTOMER_ID_REQUIRED,
            });
        } else {
            const iscustomerId = await validatecustomerId(req.body.customer_id);

            if (!iscustomerId) {
                res.status(404).json({
                    status: false,
                    message: ENUMS.CUSTOMER_MEASUREMENT.INVALID_CUSTOMER_ID,
                });
                return;
            }
            const data = await customer_measurementModel.find({
                customer_id: req.body.customer_id,
                is_deleted: false,
                $or: [
                    { "measurement_name": { $regex: req.body.value } },
                ]
            }).sort({ _id: -1 });

            
            res.status(200).json({
                status: true,
                message: ENUMS.CUSTOMER_MEASUREMENT.GET_DATA_SUCCESSFULLY,
                data
            });
        }
    } catch (error) {
        res.status(500).json({
            status: false,
            message: ENUMS.CUSTOMER_MEASUREMENT.SOMTHING_WENT_WRONG,
            error: error.message
        });
        console.error(error);
    }
};
async function validatecustomerId(customer_id) {
    try {
        const existingcustomer = await customer_measurementModel.findOne({ customer_id: customer_id, is_deleted: false });
        return !!existingcustomer;
    } catch (error) {
        console.error("Error validating customer_id:", error);
        return false;
    }
}

