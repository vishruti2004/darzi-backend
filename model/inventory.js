const  mongoose  = require("mongoose");
const inventorySchema = new mongoose.Schema({
    inventory_name:{type:String, require:true},
    quantity:{type:String,require:true},
    image:{type:String,require:true},
    tailor_id: { type: mongoose.Schema.Types.ObjectId, ref: 'tailor_user' },
    created_at:{ type:Date },
    updated_at:{ type:Date},
    is_deleted:{ type:Boolean }
        
 })
module.exports = new mongoose.model('inventory',inventorySchema)
