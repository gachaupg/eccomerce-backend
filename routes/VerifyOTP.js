
const express = require("express");
const generateAuthToken = require("../utils/generateAuthToken");
const textflow = require("textflow.js");
const{ OTPver} = require("../models/OtpV.js");

const nodemailer = require("nodemailer");


const router = express.Router();

router.get("/verify", async (req, res) => {
  
    try {
     const products =await OTPver.find()
  
      res.status(200).send(products);
    } catch (error) {
      res.status(500).send(error);
    }
})

module.exports = router;