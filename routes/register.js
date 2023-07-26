const bcrypt = require("bcrypt");
const { User } = require("../models/user");
const Joi = require("joi");
const express = require("express");
const textflow = require("textflow.js");
textflow.useKey("NQu8uqDdS4hzaUz032Vfp6JJdU97onnRsruZq4xpdsSbXygjE3VCr5d63s8h0QTM");

const generateAuthToken = require("../utils/generateAuthToken");

const router = express.Router();

router.post("/", async (req, res) => {

  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send("User with already exists...");

  console.log("here");

  const { name,country,phone,address,city,email,img, password } = req.body;

  const verificationOptions ={
    service_name: 'My super cool app',
    seconds: 600,
}


const result = await textflow.sendVerificationSMS(phone, verificationOptions);

console.log(result);
  user = new User({ name,country,phone,address,city, email,img, password,otp: result });

  // const salt = await bcrypt.genSalt(12);
  // user.password = await bcrypt.hash(usyyer.password, salt);

  await user.save();

  const token = generateAuthToken(user);

  res.send(token);
});


// router.post('/verify', async(req, res) =>{

//     const {phone, otp} = req.body;


//     let result = await textflow.verifyCode(phone, otp); 

//     if(result.valid)
//     {
//         // your server logic
//         return res.status(200).json(result.message)
//     }
//     return res.status(result.status).json(result.message)
//     })




module.exports = router;
