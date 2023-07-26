const bcrypt = require("bcrypt");
const { User } = require("../models/user");
const Joi = require("joi");
const express = require("express");
const textflow = require("textflow.js");
textflow.useKey("NQu8uqDdS4hzaUz032Vfp6JJdU97onnRsruZq4xpdsSbXygjE3VCr5d63s8h0QTM");

const generateAuthToken = require("../utils/generateAuthToken");

const router = express.Router();

router.post('/verify', async(req, res) =>{

    const {phone, otp} = req.body;


    let result = await textflow.verifyCode(phone, otp); 

    if(result.valid)
    {
        // your server logic
        return res.status(200).json(result.message)
    }
    return res.status(result.status).json(result.message)
    })