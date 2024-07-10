const  mongoose  = require("mongoose");
const orderSchema = new mongoose.Schema({
    tailor_id: { type: mongoose.Schema.Types.ObjectId, ref: 'tailor_user' },
    customer_id: { type: mongoose.Schema.Types.ObjectId, ref: 'customer' },
    employee_id:{type:Array,require:false},
    due_date:{type:Date,require:true},
    order_date:{type:Date,require:true},
    orders:{type:Array,require:true},
    status:{type:String,require:true},
    payment_value:{type:String,require:true},
    created_at:{ type:Date },
    updated_at:{ type:Date},
    is_deleted:{ type:Boolean }
 })
module.exports = new mongoose.model('order',orderSchema)
