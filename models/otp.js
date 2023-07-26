const mongoose = require("mongoose");

const otpSchema = new mongoose.Schema(
  {
   
    phone:{type:Number},
  
    // image: { type: Object },
    otp: { type: String},
    createAt:{type:Date,default:Date.now,index:{expires:300}}

  },{timestamps:true}
);

const Otp = mongoose.model("Otp", otpSchema);

exports.Otp = Otp;
