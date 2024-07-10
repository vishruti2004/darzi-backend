

const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken")
const employeeModel = require('../model/employee');
const { SECRET_KEY } = require('../config/config');
const { ENUMS } = require('../utils/enums');



exports.empregister = async (req, res) => {
    try {
        const email = req.body.email;
        const userData = await employeeModel.findOne({ email: email, is_deleted: false });

        if (userData) {
            res.status(404).json({
                "status": false,
                "message": ENUMS.EMPLOYEE.EMAIL_ALREADY_EXIST
            });
        } else {
            const hashpassword = await bcryptjs.hash(req.body.password, 10);
            var datetime = new Date();
            var user = {
                emp_name: req.body.emp_name,
                mobile: req.body.mobile,
                email: req.body.email,
                address: req.body.address,
                password: hashpassword,
                tailor_id: req.body.tailor_id
            };
            user.created_at = datetime;
            user.updated_at = datetime;
            user.is_deleted = false;

            const data = await employeeModel.create(user);

            res.status(200).json({
                id: data._id,
                emp_name: data.emp_name,
                email: data.email,
                mobile: data.mobile,
                address: data.address,
                tailor_id: data.tailor_id,
            });
        }
    } catch (error) {
        res.status(404).json({
            status: false,
            message: ENUMS.EMPLOYEE.SOMTHING_WENT_WRONG
        })
        
    }
};


exports.emplogin = async (req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;
        const userData = await employeeModel.findOne({ email: email, is_deleted: false });
        
        if (userData) {
            const passwordmatch = await bcryptjs.compare(password, userData.password);
            if (passwordmatch) {
                var accessToken = jwt.sign({ id: userData._id, email: userData.email }, SECRET_KEY);
                res.status(200).json({
                    status: true,
                    message: ENUMS.EMPLOYEE.LOGIN_SUCCESS,
                    accessToken,
                    data: {
                        id: userData._id,
                        emp_name: userData.emp_name,
                        email: userData.email,
                        mobile: userData.mobile,
                        address: userData.address,
                        tailor_id: userData.tailor_id
                    }
                })
            } else {
                res.status(402).json({
                    status: false,
                    message: ENUMS.EMPLOYEE.INCORRECT_PASSWORD
                })
            }

        } else {
            res.status(404).json({
                status: false,
                message: ENUMS.EMPLOYEE.INCORRECT_EMAIL
            })
        }
    } catch (error) {
        res.status(404).json({
            status: false,
            message: ENUMS.EMPLOYEE.SOMTHING_WENT_WRONG
        })
        
    }
}




exports.getemployee = async (req, res) => {
    try {

        if (!req.body.tailor_id) {
            res.status(400).json({
                status: false,
                message: ENUMS.EMPLOYEE.FIELD_REQUIRED,
            });
        }
        else {
            var page = req.params.page
            var limit = 10;
            var skip = (page - 1) * limit
            const data = await employeeModel.find({ tailor_id: req.body.tailor_id, is_deleted: false }).sort({ _id: -1 }).limit(limit).skip(skip);
            

            res.status(200).json({
                data,
                status: true,
                message: ENUMS.EMPLOYEE.EMPLOYEE_DETAILS_FETCHED_SUCCESSFULLY,
            });
        }
    }
    catch (error) {
        res.status(404).json({
            status: false,
            message: ENUMS.EMPLOYEE.SOMTHING_WENT_WRONG
        })
     
    }
}



exports.updatemployee = async (req, res) => {
    try {
        if (!req.body.id) {
            return res.status(400).json({
                status: false,
                message: ENUMS.EMPLOYEE.EMPLOYEE_ID_REQUIRED,
            });
        } else {
            const { id, ...updateData } = req.body;

            updateData.updated_at = Date.now();

            await employeeModel.findByIdAndUpdate(id, updateData);

            const updateUser = await employeeModel.findById(id);

            res.status(200).json({
                status: ENUMS.EMPLOYEE.EMPLOYEE_STATUS_UPDATE_SUCCESSFULLY,
                result: {
                    id: updateUser._id,
                    emp_name: updateUser.emp_name,
                    mobile: updateUser.mobile,
                    address: updateUser.address,
                    email: updateUser.email,
                    updated_at: updateUser.updated_at,
                },
            });
        }
    } catch (error) {
        console.error(error);
        return res.status(404).json({
            status: false,
            message: ENUMS.EMPLOYEE.SOMTHING_WENT_WRONG
        });
    }
};


exports.deleteemployee = async (req, res) => {
    try {
        const updateid = { _id: req.body.id };

        const updateFields = {
            $set: {
                is_deleted: true,
                updated_at: req.body.updated_at || Date.now(),
            },
        };

        const deleteUser = await employeeModel.findOneAndUpdate(
            updateid,
            updateFields,

            { new: true }
        );

        if (!deleteUser) {
            return res.status(404).json({
                status: false,
                message: ENUMS.EMPLOYEE.USER_NOT_FOUND,
            });
        }

        res.status(200).json({
            status: true,
            message: ENUMS.EMPLOYEE.EMPLOYEE_STATUS_DELETE_SUCCESSFULLY,
            // deleteUser: deleteUser,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: false,
            message: ENUMS.EMPLOYEE.SOMTHING_WENT_WRONG
        });
    }
};

exports.searchemployee = async (req, res) => {
    try {
        if (!req.body.tailor_id) {
            res.status(400).json({
                status: false,
                message: ENUMS.EMPLOYEE.TAILOR_ID_REQUIRED,
            });
        } else {
            // Validate tailor_id
            const isValidTailorId = await validateTailorId(req.body.tailor_id);

            if (!isValidTailorId) {
                res.status(404).json({
                    status: false,
                    message: ENUMS.EMPLOYEE.INVALID_TAILOR_iD,
                });
                return;
            }
            const data = await employeeModel.find({
                tailor_id: req.body.tailor_id,
                is_deleted: false,
                $or: [
                    { "customer_name": { $regex: req.body.value } },
                    { "email": { $regex: req.body.value } },
                    { "mobile": { $regex: req.body.value } }
                ]

            }).sort({ _id: -1 });

            
            res.status(200).json({
                status: true,
                message: ENUMS.EMPLOYEE.GET_DATA_SUCCESSFULLY,
                data
            });
        }
    } catch (error) {
        res.status(500).json({
            status: false,
            message: ENUMS.EMPLOYEE.SOMTHING_WENT_WRONG,
            error: error.message
        });
        console.error(error);
    }
};
async function validateTailorId(tailorId) {
    try {
        const existingTailor = await employeeModel.findOne({ tailor_id: tailorId, is_deleted: false });
        return !!existingTailor;
    } catch (error) {
        console.error("Error validating tailor_id:", error);
        return false;
    }
}




exports.getemployeeWithoutPagination = async (req, res) => {
    try {

        if (!req.body.tailor_id) {
            res.status(400).json({
                status: false,
                message: ENUMS.EMPLOYEE.FIELD_REQUIRED,
            });
        }
        else {
            const data = await employeeModel.find({ tailor_id: req.body.tailor_id, is_deleted: false });


            res.status(200).json({
                data,
                status: true,
                message: ENUMS.EMPLOYEE.EMPLOYEE_DETAILS_FETCHED_SUCCESSFULLY,
            });
        }
    }
    catch (error) {
        res.status(404).json({
            status: false,
            message: ENUMS.EMPLOYEE.SOMTHING_WENT_WRONG
        })
        
    }
}
