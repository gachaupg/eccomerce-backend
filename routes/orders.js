const express = require('express');
const bodyParser = require('body-parser');
const { Order } = require('../models/order');
const router = require("express").Router();

// Simulated database for storing orders


// Example server-side route handling
router.post('/create-order', async (req, res) => {
    try {
      const { userId, address,name,email, cartTotalAmount } = req.body;
  
      // Perform validation, create the order, and save to the database
      const newOrder = new Order({
        userId,
        name,
        email,
        address,
        cartTotalAmount,
      });
  
      await newOrder.save();
  
      res.status(201).json( newOrder );
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred while creating the order' });
    }
  });
  router.get("/", async (req, res) => {
  
    try {
     const products =await Order.find()
  
      res.status(200).send(products);
    } catch (error) {
      res.status(500).send(error);
    }
  });
  

  module.exports = router;
