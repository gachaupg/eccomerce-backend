const TextFlow = require("textflow.js");
const bcrypt = require("bcrypt");
const { User } = require("../models/user");
const Joi = require("joi");
const express = require("express");
TextFlow.useKey("FahfY1b8iWt2vKgwgjWDKCTS4eJc745Gzbd3tFqJhg9mj18SepW5aUiFK4ss1cbi");
const router = express.Router();

router.post('/verify', async (req, res) => {

    const {  otp } = req.body;


    let result = await TextFlow.verifyCode( otp);
    console.log(result);
    if (result.valid) {
        // your server logic
        return res.status(200).json(result.message)
    }
    return res.status(result.status).json(result.message)
})

module.exports = router;
