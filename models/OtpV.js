const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
   
    otp:{type:Number},
    createdAt:{type:Date},
    expiresAt:{type:Date},
    
  },
  { timestamps: true }
);

const OTPver = mongoose.model("OTPE", userSchema);

exports.OTPver = OTPver;
