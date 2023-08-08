const bcrypt = require("bcryptjs");
const { User } = require("../models/user");
const express = require("express");
const generateAuthToken = require("../utils/generateAuthToken");
const textflow = require("textflow.js");
const { OTPver } = require("../models/OtpV.js");
const twilio = require('twilio'); 
const nodemailer = require("nodemailer");

require("dotenv").config();
textflow.useKey(
  "lm0VZnCdPVHGPibl5CkLKg33udAXsRPSiiWj4BYi2faSdOAZowGJYjunA8Boyely"
);

const accountSid =process.env.accountSid;
const authToken = process.env.TOKEN; 
const client = new twilio(accountSid, authToken);

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    let user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).send("User already exists...");

    const verificationOptions = {
      service_name: "My super cool app",
      seconds: 600,
    };

    const { name, email, phone, address, city, age, img, password } = req.body;

    const otp = `${Math.floor(1000 + Math.random() * 9000)}`;

    const result = await textflow.sendVerificationSMS(
      `254${phone}`,
      verificationOptions
    );

    console.log(result);

    user = new User({
      name,
      email,
      verified: false,
      password,
      phone,
      address,
      city,
      age,
      img,
      verificationCode: otp // Add the verification code to the user object
    });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    await user.save();

    // Send the OTP to the user's phone number
    await SMS(phone,email,user, otp);

    const token = generateAuthToken(user);
    res.send(token);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
});

// Move the SMS function outside of the router
const SMS = async (phone,user,email, otp) => {
  // Send Text
  try {
    await client.messages.create({
      body: `Your verification code: ${otp}`,
      to:`+254${phone.substring(1)}`,  // Text this number
      from: '+17624753835' // From a valid Twilio number
    });
    const OTPDoc = new OTPver({
      userId:user._id,
      email:user.email,
      otp,
      phone, // Store the hashed OTP in the database
      createdAt: Date.now(),
      expiresAt: Date.now() + 3600000,
    });

    await OTPDoc.save();
    console.log("Verification code sent successfully.");
  } catch (error) {
    console.error("Error sending verification code:", error);
  }
}


router.delete("/:id", async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).send("Product has been deleted...");
  } catch (error) {
    res.status(500).send(error);
  }
});


const sendOTP = async (user, email, res) => {

const id= user._id


  try {
    const otp = `${Math.floor(1000 + Math.random() * 9000)}`;
    
    var mailOptions = {
      from: "petergachau57@gmail.com",
      to: email,
      subject: "Notification from easy pay",
      html: `
      <h3>Notification</h3>
      <ul>
      <li>
      Message: ${otp}
      </li>
      </ul>
      `,
    };

    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "petergachau57@gmail.com",
        pass: "atgwlwufhipufmte",
      },
    });

    const salt = await bcrypt.genSalt(5);
    const hashedOTP = await bcrypt.hash(otp, salt);

    const OTPDoc = new OTPver({
      userId: id,
      email:user.email,
      otp, // Store the hashed OTP in the database
      createdAt: Date.now(),
      expiresAt: Date.now() + 3600000,
    });

    await OTPDoc.save();
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
        res.status(500).send("Failed to send OTP via email.");
      } else {
        console.log("Email sent: " + info.response);
        res.send("OTP sent via email.");
      }
    });
  } catch (error) {
    console.log(error);
    // res.status(500).send("Internal Server Error");
  }
};

module.exports = router;
