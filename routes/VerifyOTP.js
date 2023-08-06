const express = require("express");
const { OTPver } = require("../models/OtpV.js");
const bcrypt = require("bcryptjs");
const { User } = require("../models/user.js");

const router = express.Router();

router.post("/verify-otp", async (req, res) => {
  try {
    const { userId, otp } = req.body;
    const otpDoc = await OTPver.findOne({ userId }).sort({ createdAt: -1 });

    // if (!otpDoc) {
    //   return res.status(400).send("Invalid verification code.");
    // }

    // if (Date.now() > otpDoc.expiresAt) {
    //   await OTPver.findByIdAndDelete(otpDoc._id); // Remove the expired OTP document from the database
    //   return res.status(400).send("Expired verification code.");
    // }

    // if (otp !== otpDoc.otp) {
    //   return res.status(400).send("Invalid verification code.");
    // }

    // await OTPver.findByIdAndDelete(otpDoc._id); // Remove the OTP document from the database after successful verification

   
    await User.findByIdAndUpdate(userId, { verified: true });

    res.send("OTP verification successful.");
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
});


router.get("/verify", async (req, res) => {
  
    try {
     const products =await OTPver.find()
  
      res.status(200).send(products);
    } catch (error) {
      res.status(500).send(error);
    }
})

module.exports = router;