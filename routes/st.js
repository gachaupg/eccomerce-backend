const express = require("express");
const Stripe = require('stripe')
require("dotenv").config();
const cors = require("cors");
const stripe=Stripe(process.env.STRIPE_KEY)



const router = express.Router();


router.post('/create-checkout-session', async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
        price_data: {
     currency:'pab',
   product_data:{
    name:'T-shirt'
},
unit_amount:2000,
        },
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: `${process.env.CLIENT_URL}/checkout-success`,
    cancel_url: `${process.env.CLIENT_URL}/cart`,
  });

  res.redirect(303, session.url);
});

module.exports = router;