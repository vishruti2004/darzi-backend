const measurementModel = require("../model/measurement");
const { ENUMS } = require('../utils/enums');


exports.addmeasurement = async (req, res) => {

    try {
        const { measurement_name, measurement_values, tailor_id } = req.body;

        if (
            !measurement_name ||
            !measurement_values ||
            !tailor_id
        ) {
            res.status(400).json({
                status: false,
                message: ENUMS.MEASUREMENT.FIELD_REQUIRED
            })
        } else {


            var datetime = new Date();
            var user = {
                measurement_name: req.body.measurement_name,
                measurement_values: req.body.measurement_values,
                tailor_id: req.body.tailor_id
            };
            user.created_at = datetime;
            user.date = datetime;
            user.updated_at = datetime;
            user.is_deleted = false;

            const data = await measurementModel.create(user);
            res.status(200).json({
                status: true,
                message: ENUMS.MEASUREMENT.DATA_INSERT_SUCCESS,
                id: data._id,
                measurement_name: data.measurement_name,
                measurement_values: data.measurement_values,
                date: data.date,
                tailor_id: data.tailor_id,
            });

        }
    } catch (error) {
        res.status(404).json({
            status: false,
            message: ENUMS.MEASUREMENT.SOMTHING_WENT_WRONG
        })
        
    }
}

exports.updatemeasurement = async (req, res) => {
    try {
        if (!req.body.id) {
            return res.status(400).json({
                status: false,
                message: ENUMS.MEASUREMENT.MEASUREMENT_ID_REQUIRED,
            });
        } else {
            req.body.updated_at = Date.now();

            await measurementModel.findByIdAndUpdate(req.body.id, req.body);

            const updatedmeasurement = await measurementModel.findById(req.body.id);

            res.status(200).json({
                status: ENUMS.MEASUREMENT.MEASUREMENT_STATUS_UPDATE_SUCCESSFULLY,
                result: {
                    id: updatedmeasurement._id,
                    measurement_name: updatedmeasurement.measurement_name,
                    measurement_values: updatedmeasurement.measurement_values,
                    updated_at: updatedmeasurement.updated_at,
                },
            });
        }
    } catch (error) {
        console.error(error);
        return res.status(404).json({
            status: false,
            message: ENUMS.MEASUREMENT.SOMTHING_WENT_WRONG
        });
    }
};

exports.deletemeasurement = async (req, res) => {
    try {
        const updateid = { _id: req.body.id };

        const updateFields = {
            $set: {
                is_deleted: true,
                updated_at: req.body.updated_at || Date.now(),
            },
        };

        const deletemeasurement = await measurementModel.findOneAndUpdate(
            updateid,
            updateFields,

            { new: true }
        );

        if (!deletemeasurement) {
            return res.status(404).json({
                status: false,
                message: ENUMS.MEASUREMENT.MEASUREMENT_NOT_FOUND,
            });
        }

        res.status(200).json({
            status: true,
            message: ENUMS.MEASUREMENT.MEASUREMENT_STATUS_DELETE_SUCCESSFULLY,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: false,
            message: ENUMS.MEASUREMENT.SOMTHING_WENT_WRONG

        });
    }
};


exports.getmeasurement = async (req, res) => {
    try {

        if (!req.body.tailor_id) {
            res.status(400).json({
                status: false,
                message: ENUMS.MEASUREMENT.FIELD_REQUIRED
            });
        }
        else {
            var page = req.params.page
            var limit = 10;
            var skip = (page - 1) * limit
            const data = await measurementModel.find({ tailor_id: req.body.tailor_id, is_deleted: false }).sort({ _id: -1 }).limit(limit).skip(skip);
            
            res.status(200).json({
                status: true,
                message: ENUMS.MEASUREMENT.MEASUREMENT_DETAILS_FETCHED_SUCCESSFULLY,
                data
            });
        }
    }


    catch (error) {
        res.status(404).json({
            status: false,
            message: ENUMS.MEASUREMENT.SOMTHING_WENT_WRONG
        })
        
    }
}



exports.getmeasurementWithoutPagination = async (req, res) => {
    try {

        if (!req.body.tailor_id) {
            res.status(400).json({
                status: false,
                message: ENUMS.MEASUREMENT.FIELD_REQUIRED
            });
        }
        else {

            const data = await measurementModel.find({ tailor_id: req.body.tailor_id, is_deleted: false }).sort({ _id: -1 });
            
            res.status(200).json({
                status: true,
                message: ENUMS.MEASUREMENT.MEASUREMENT_DETAILS_FETCHED_SUCCESSFULLY,
                data
            });
        }
    }


    catch (error) {
        res.status(404).json({
            status: false,
            message: ENUMS.MEASUREMENT.SOMTHING_WENT_WRONG
        })
        
    }
}

exports.searchmeasurement = async (req, res) => {
    try {
        if (!req.body.tailor_id) {
            res.status(400).json({
                status: false,
                message:ENUMS.MEASUREMENT.TAILOR_ID_REQUIRED,
            });
        } else {
            const isValidTailorId = await validateTailorId(req.body.tailor_id);

            if (!isValidTailorId) {
                res.status(404).json({
                    status: false,
                    message: ENUMS.MEASUREMENT.INVALID_TAILOR_iD,
                });
                return;
            }
            const data = await measurementModel.find({
                tailor_id: req.body.tailor_id,
                is_deleted: false,
                $or: [
                    { "measurement_values" : { $regex:req.body.value } },
                    { "measurement_name" : { $regex:req.body.value } }
                ]
            }).sort({_id:-1});

            
            res.status(200).json({
                status: true,
                message:ENUMS.MEASUREMENT.MEASUREMENT_DETAILS_FETCHED_SUCCESSFULLY,
                data
            });
        }
    } catch (error) {
        res.status(500).json({
            status: false,
            message:ENUMS.MEASUREMENT.SOMTHING_WENT_WRONG,
            error: error.message
        });
        console.error(error);
    }
};
async function validateTailorId(tailorId) {
    try {
        const existingTailor = await measurementModel.findOne({ tailor_id: tailorId, is_deleted: false });
        return !!existingTailor;
    } catch (error) {
        console.error("Error validating measurement_id:", error);
        return false; 
    }
}