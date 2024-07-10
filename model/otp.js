const  mongoose  = require("mongoose");



const otpSchema = new mongoose.Schema({
    email:{type:String,require:true},
    otp:{type:String,require:true}
})

module.exports = new mongoose.model('otp',otpSchema)