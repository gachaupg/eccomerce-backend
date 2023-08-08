const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    userId:{type:String},
    email:{type:String},
    otp:{type:Number},
    phone:{type:Number},
    createdAt:{type:Date},
    expiresAt:{type:Date},
    verified:{type:Boolean,default:false}
    
  },
  { timestamps: true }
);

const OTPver = mongoose.model("OTPE", userSchema);

exports.OTPver = OTPver;
