const mongoose = require("mongoose");
const customerschema = new mongoose.Schema({
    customer_name: { type: String, require: true },
    tailor_id: { type: mongoose.Schema.Types.ObjectId, ref: 'tailor_user' },
    // tailor_id:{type:String,require:true},
        email: { type: String, require: true },
    mobile: { type: String, require: true },
    address: { type: String, require: true },
    gender: { type: String, require: true },
    created_at: { type: Date },
    updated_at: { type: Date },
    is_deleted: { type: Boolean },
}) 
module.exports = new mongoose.model('customer', customerschema)

