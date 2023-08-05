const bcrypt = require("bcryptjs");
const { User } = require("../models/user");
const Joi = require("joi");
const express = require("express");
const generateAuthToken = require("../utils/generateAuthToken");
const textflow = require("textflow.js");
textflow.useKey("lm0VZnCdPVHGPibl5CkLKg33udAXsRPSiiWj4BYi2faSdOAZowGJYjunA8Boyely");

const router = express.Router();

router.post("/", async (req, res) => {
 
  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send("User already exists...");

  const verificationOptions ={
    service_name: 'My super cool app',
    seconds: 600,
}
// Sending an SMS in one line
textflow.sendSMS("+254789312381", "Dummy message text...");

// OTP Verification
// User has sent his phone number for verification
textflow.sendVerificationSMS("+254789312381", verificationOptions);

// Show him the code submission form
// We will handle the verification code ourselves

// The user has submitted the code
// let result = await textflow.verifyCode("+254789312381", "USER_ENTERED_CODE"); 



  const { name, email,phone,address,city,age,img, password } = req.body;
  const result = await textflow.sendVerificationSMS(`254${phone}`, verificationOptions);

  console.log(result);
  
  user = new User({ name, email, password ,phone,address,city,age,email,img });

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);

  await user.save();

  const token = generateAuthToken(user);

  res.send(token);
});

module.exports = router;





// const bcrypt = require("bcryptjs");
// const { User } = require("../models/user");
// const Joi = require("joi");
// const express = require("express");

// const generateAuthToken = require("../utils/generateAuthToken");

// const router = express.Router();

// router.post("/", async (req, res) => {

//   let user = await User.findOne({ email: req.body.email });
//   if (user) return res.status(400).send("User with already exists...");

//   console.log("here");

//   const { name,country,phone,address,city,age,email,img, password } = req.body;



// const salt = await bcrypt.genSalt(10);
// userpassword = await bcrypt.hash(user.password, salt);
//   user = new User({ name,country,phone,address,age,city, email,img, password});

//   // const salt = await bcrypt.genSalt(12);
//   // user.password = await bcrypt.hash(usyyer.password, salt);

//   await user.save();

//   const token = generateAuthToken(user);

//   res.send({token,user});
// });


// // router.post('/verify', async(req, res) =>{

// //     const {phone, otp} = req.body;


// //     let result = await textflow.verifyCode(phone, otp); 

// //     if(result.valid)
// //     {
// //         // your server logic
// //         return res.status(200).json(result.message)
// //     }
// //     return res.status(result.status).json(result.message)
// //     })




// module.exports = router;
