const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    brand: { type: String, required: true },
    desc: { type: String, required: true },
    price: { type: Number},
    image: { type: Object, required: true },
    No: { type: Number },
    ram: { type: String },
    rom: { type: String },
    battery: { type: String },
    camera: { type: String },
    os: { type: String },
    sim: { type: String },
    sim: { type: String },
    creator:String,
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);

exports.Product = Product;
