const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, minlength: 3, maxlength: 30 },
    email: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 200,
      unique: true,
    },
    country:{type:String},
    img:{type:String},
    phone:{type:Number},
    city:{type:String},
    age:{type:String},
    otp:{
     type:Number,
     default:0
    },
    address:{type:String},
    // image: { type: Object },
    password: { type: String, minlength: 3, maxlength: 1024 },
    isAdmin: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

exports.User = User;
