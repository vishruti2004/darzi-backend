const mongoose = require("mongoose");
const measurementschema = new mongoose.Schema({
    measurement_name: { type: String, require: true },
    tailor_id:{type:String},
    created_at: { type: Date },
    date: { type: Date },
    updated_at: { type: Date },
    is_deleted: { type: Boolean },
    measurement_values: { type: Array, require: true },

});

module.exports = new mongoose.model('measurement', measurementschema)
