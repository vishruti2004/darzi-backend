
const mongoose = require("mongoose");
const customer_measurementschema = new mongoose.Schema({
    customer_id: { type: String, require: true },
    tailor_id: { type: String, require: true },
    measurement_id: { type: String, require: true },
    measurement_name: { type: String, require: true },
    measurement_type: { type: String, require: true },
    date: { type: Date, require: true, default: new Date() },
    created_at: { type: Date, default: new Date() },
    updated_at: { type: Date, default: new Date() },
    is_deleted: { type: Boolean, default: false },
    measurement_values : {type:Array,require:true}
})
module.exports = new mongoose.model('customer_measurement', customer_measurementschema)
