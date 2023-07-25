import request from "request";
import "dotenv/config";
import { getTimestamp } from "../utils/timestamp.js";
import ngrok from "ngrok";
import mpesaModal from "../models/mpesa.js";
import mongoose from 'mongoose'
import localtunnel from 'localtunnel'
// @desc initiate stk push
// @method POST
// @route /stkPush
// @access public
export const mpesa = async (req, res) => {
  try {
    // const tours = await TourModal.find();
    // res.status(200).json(tours);

    const tours = await mpesaModal.find();
    res.json(tours);
  } catch (error) {
    res.status(404).json({ message: "Something went wrong" });
  }
};
export const getToursByUser = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ message: "User doesn't exist" });
  }
  const userTours = await mpesaModal.find({ creator: id });
  res.status(200).json(userTours);
};

export const initiateSTKPush = async (req, res) => {
  const { amount, phone, name, email, location,status ,isComplete,Order_ID } = req.body;

  try {
    const url =
      "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest";
    const auth = "Bearer " + req.safaricom_access_token;

    const timestamp = getTimestamp();
    //shortcode + passkey + timestamp
    const password = new Buffer.from(
      process.env.BUSINESS_SHORT_CODE + process.env.PASS_KEY + timestamp
    ).toString("base64");
    // create callback url
    const callback_url = `https://8efc-197-237-246-189.ngrok.io/mpesa/myCallBackUrl`;
    let officialPhoneNo=phone.substring(1)

    // 326033
    console.log("callback ", callback_url);
    request({
      url: url,
      method: "POST",
      headers: {
        Authorization: auth,
      },
      json: {
        BusinessShortCode: process.env.BUSINESS_SHORT_CODE,
        Password: password,
        Timestamp: timestamp,
        TransactionType: "CustomerPayBillOnline",
        Amount: amount,
        PartyA: phone,
        PartyB: process.env.BUSINESS_SHORT_CODE,
        PhoneNumber:`254${officialPhoneNo}`,
        CallBackURL: callback_url,
        AccountReference: "Peter Gacahu",
        TransactionDesc: "Paid online",
      },
    });
    const mpesaNew = new mpesaModal({
      phone,
      amount,
      name,
      email,
      status,
      isComplete,
      location,
      Order_ID,
      creator: req.userId,
    });
    await mpesaNew.save();
    res.status(201).json(mpesaNew);
  } catch (e) {
    console.error("Error while trying to create LipaNaMpesa details", e);
    // res.status(503).send({
    // message:"Something went wrong while trying to create LipaNaMpesa details. Contact admin",
    // error : e
    // })
  }
};

// @desc callback route Safaricom will post transaction status
// @method POST
// @route /stkPushCallback/:Order_ID
// @access public
export const stkPushCallback = async (req, res) => {
  try {
    //    order id
    const { Order_ID } = req.params;

    //callback details

    const {
      MerchantRequestID,
      CheckoutRequestID,
      ResultCode,
      ResultDesc,
      CallbackMetadata,
    } = req.body.Body.stkCallback;

    //     get the meta data from the meta
    const meta = Object.values(await CallbackMetadata.Item);
    const PhoneNumber = meta
      .find((o) => o.Name === "PhoneNumber")
      .Value.toString();
    const Amount = meta.find((o) => o.Name === "Amount").Value.toString();
    const MpesaReceiptNumber = meta
      .find((o) => o.Name === "MpesaReceiptNumber")
      .Value.toString();
    const TransactionDate = meta
      .find((o) => o.Name === "TransactionDate")
      .Value.toString();

    // do something with the data
    console.log("-".repeat(20), " OUTPUT IN THE CALLBACK ", "-".repeat(20));
    console.log(`
            Order_ID : ${Order_ID},
            MerchantRequestID : ${MerchantRequestID},
            CheckoutRequestID: ${CheckoutRequestID},
            ResultCode: ${ResultCode},
            ResultDesc: ${ResultDesc},
            PhoneNumber : ${PhoneNumber},
            Amount: ${Amount}, 
            MpesaReceiptNumber: ${MpesaReceiptNumber},
            TransactionDate : ${TransactionDate}
        `);

    res.json(true);
  } catch (e) {
    console.error(
      "Error while trying to update LipaNaMpesa details from the callback",
      e
    );
  }
};
// @desc Check from safaricom servers the status of a transaction
// @method GET
// @route /confirmPayment/:CheckoutRequestID
// @access public
export const confirmPayment = async (req, res) => {
  try {
    const url = "https://sandbox.safaricom.co.ke/mpesa/stkpushquery/v1/query";
    const auth = "Bearer " + req.safaricom_access_token;

    const timestamp = getTimestamp();
    //shortcode + passkey + timestamp
    const password = new Buffer.from(
      process.env.BUSINESS_SHORT_CODE + process.env.PASS_KEY + timestamp
    ).toString("base64");

    request(
      {
        url: url,
        method: "POST",
        headers: {
          Authorization: auth,
        },
        json: {
          BusinessShortCode: process.env.BUSINESS_SHORT_CODE,
          Password: password,
          Timestamp: timestamp,
          CheckoutRequestID: req.params.CheckoutRequestID,
        },
      },
      function (error, response, body) {
        if (error) {
          console.log(error);
          res.status(503).send({
            message:
              "Something went wrong while trying to create LipaNaMpesa details. Contact admin",
            error: error,
          });
        } else {
          res.status(200).json(body);
        }
      }
    );
  } catch (e) {
    console.error("Error while trying to create LipaNaMpesa details", e);
    // res.status(503).send({
    // message:"Something went wrong while trying to create LipaNaMpesa details. Contact admin",
    // error : e
    // })
  }
};
