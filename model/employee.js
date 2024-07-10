const  mongoose  = require("mongoose");
const employeeSchema = new mongoose.Schema({
    tailor_id: { type: mongoose.Schema.Types.ObjectId, ref: 'tailor_user' },
    emp_name:{ type:String, require:true },
    email:{ type:String, require:true },
    password:{ type:String, require:true },
    mobile:{ type:String, require:true },
    address:{ type:String, require:true },
    status:{type:String,require:true},
    created_at:{ type:Date },
    updated_at:{ type:Date},
    is_deleted:{ type:Boolean }
 })

module.exports = new mongoose.model('employee',employeeSchema)
