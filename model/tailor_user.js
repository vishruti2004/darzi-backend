const  mongoose  = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new mongoose.Schema({
    shop_name:{ type:String, require:true },
    owner_name:{ type:String, require:true },
    email:{ type:String, require:true },
    password:{ type:String, require:true },
    image:{ type:String, require:true },
    mobile:{ type:String, require:true },
    address:{ type:String, require:true },
    created_at:{ type:Date },
    updated_at:{ type:Date},
    is_deleted:{ type:Boolean },
    is_active:{type:Boolean}
 })

 module.exports = new mongoose.model('tailor_user',userSchema);


 