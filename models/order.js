const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type:String
    },
    name: {
      type:String
    },
    email: {
      type:String
    },
    address: {
      type: String,
      
    },
    cartTotalAmount: {
      type: Number,
      
    },
    timestamp: {
      type: Date,
      default: Date.now,
    },
 
  },
  
  { timestamps: true }
);

const Order = mongoose.model("Orders", orderSchema);

exports.Order = Order;
