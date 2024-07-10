const inventoryModel = require("../model/inventory");
const { ENUMS } = require('../utils/enums');


exports.addinventory = async (req, res) => {

    try {
        const { inventory_name, quantity, image, tailor_id } = req.body;

        if (
            !inventory_name ||
            !quantity ||
            !image ||
            !tailor_id
        ) {
            res.status(400).json({
                status: false,
                message:ENUMS.INVENTORY.INVENTORY.FIELD_REQUIRED
            })
        } else {

            var datetime = new Date();
            var user = {
                inventory_name: req.body.inventory_name,
                quantity: req.body.quantity,
                image: req.body.image,
                tailor_id: req.body.tailor_id
            };
            user.created_at = datetime;
            user.updated_at = datetime;
            user.is_deleted = false;

            const data = await inventoryModel.create(user);
            res.status(200).json({
                status: true,
                message:ENUMS.INVENTORY.DATA_INSERT_SUCCESS,
                id: data._id,
                inventory_name: data.inventory_name,
                quantity: data.quantity,
                image: data.image,
                tailor_id: data.tailor_id,
            });

        }
    } catch (error) {
        res.status(404).json({
            status: false,
            message:ENUMS.INVENTORY.SOMTHING_WENT_WRONG
        })
        
    }
}




exports.getinventory = async (req, res) => {
    try {

        if (!req.body.tailor_id) {
            res.status(400).json({
                status: false,
                message:ENUMS.INVENTORY.FIELD_REQUIRED
            });
        }
        else {
            var page = req.params.page
            var limit = 10;
            var skip = (page - 1) * limit
            const data = await inventoryModel.find({ tailor_id: req.body.tailor_id, is_deleted: false }).sort({_id:-1}).limit(limit).skip(skip);
            
            res.status(200).json({
                status: true,
                message:ENUMS.INVENTORY.INVENTORY_DETAILS_FETCHED_SUCCESSFULLY,
                data
            });
        }
    }


    catch (error) {
        res.status(404).json({
            status: false,
            message:ENUMS.INVENTORY.SOMTHING_WENT_WRONG
        })
        
    }
}

exports.updateinventory = async (req, res) => {
    try {
        if (!req.body.id) {
            return res.status(400).json({
                status: false,
                message:ENUMS.INVENTORY.INVENTORY_ID_REQUIRED,
            });
        } else {
            req.body.updated_at = Date.now();

            await inventoryModel.findByIdAndUpdate(req.body.id, req.body);

            const updatedInventory = await inventoryModel.findById(req.body.id);

            res.status(200).json({
                status:ENUMS.INVENTORY.INVENTORY_STATUS_UPDATE_SUCCESSFULLY,
                result: {
                    id: updatedInventory._id,
                    image: updatedInventory.image,
                    quantity: updatedInventory.quantity,
                    inventory_name: updatedInventory.inventory_name,
                    updated_at: updatedInventory.updated_at,
                },
            });
        }
    } catch (error) {
        console.error(error);
        return res.status(404).json({
            status: false,
            message:ENUMS.INVENTORY.SOMTHING_WENT_WRONG
        });
    }
};

exports.deleteinventory = async (req, res) => {
    try {
        const updateid = { _id: req.body.id };

        const updateFields = {
            $set: {
                is_deleted: true,
                updated_at: req.body.updated_at || Date.now(),
            },
        };

        const deleteinventory = await inventoryModel.findOneAndUpdate(
            updateid,
            updateFields,

            { new: true }
        );

        if (!deleteinventory) {
            return res.status(404).json({
                status: false,
                message:ENUMS.INVENTORY.INVENTORY_NOT_FOUND,
            });
        }

        res.status(200).json({
            status: true,
            message:ENUMS.INVENTORY.INVENTORY_STATUS_DELETE_SUCCESSFULLY,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: false,
            message:ENUMS.INVENTORY.SOMTHING_WENT_WRONG

        });
    }
};




exports.searchinventory = async (req, res) => {
    try {
        if (!req.body.tailor_id) {
            res.status(400).json({
                status: false,
                message:ENUMS.INVENTORY.TAILOR_ID_REQUIRED,
            });
        } else {
            const isValidTailorId = await validateTailorId(req.body.tailor_id);

            if (!isValidTailorId) {
                res.status(404).json({
                    status: false,
                    message: ENUMS.INVENTORY.INVALID_TAILOR_iD,
                });
                return;
            }
            const data = await inventoryModel.find({
                tailor_id: req.body.tailor_id,
                is_deleted: false,
                $or: [
                    { "inventory_name": { $regex: req.body.value } },
                    { "quantity": { $regex: req.body.value } }
                ]
            }).sort({_id:-1});

        
            res.status(200).json({
                status: true,
                message:ENUMS.INVENTORY.INVENTORY_DETAILS_FETCHED_SUCCESSFULLY,
                data
            });
        }
    } catch (error) {
        res.status(500).json({
            status: false,
            message:ENUMS.INVENTORY.SOMTHING_WENT_WRONG,
            error: error.message
        });
        console.error(error);
    }
};
async function validateTailorId(tailorId) {
    try {
        const existingTailor = await inventoryModel.findOne({ tailor_id: tailorId, is_deleted: false });
        return !!existingTailor;
    } catch (error) {
        console.error("Error validating tailor_id:", error);
        return false; 
    }
}













