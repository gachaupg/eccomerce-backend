const userModal = require('../models/user') 
const tourModal = require('../models/product') 
const moment = require('moment') 
const express = require('express') 

// import tourModal from '../models/products.js'
// const {auth,isUser,isAdmin}=require('../middleware/auth')
// import moment from 'moment'
// import express from 'express'
const router =express.Router()


router.get ('/stats', async (req,res)=>{
    const previosMonth=moment()
    .month(moment().month()-1)
    .set('date',1)
    .format('YYYY-MM-DD HH:mm:ss');
    // res.status(200).send(previosMonth)
    try {
        const users= await User.aggregate([
            {$match:{createdAt:{$gte:new Date(previosMonth)}},
        
        },
        {
            $project:{
            month:{$month: '$createdAt'},
        } 
        },
        {
            $group:{
                _id:'$month',
                total:{$sum:1},
            }
        }
       
        ]);
        res.status(200).send(users);
    } catch (error) {
        console.log(error);
        res.status(500).send(error)
    }
})


router.get ('/pending',  async (req,res)=>{
    const previosMonth=moment()
    .month(moment().month()-1)
    .set('date',1)
    .format('YYYY-MM-DD HH:mm:ss');
    // res.status(200).send(previosMonth)
    try {
        const users= await userModal.aggregate([
            { $match : {status:false,isComplete:false}  },
       
        ]);
        res.status(200).send(users);
    } catch (error) {
        console.log(error);
        res.status(500).send(error)
    }
})

router.get ('/succes',  async (req,res)=>{
    const previosMonth=moment()
    .month(moment().month()-1)
    .set('date',1)
    .format('YYYY-MM-DD HH:mm:ss');
    // res.status(200).send(previosMonth)
    try {
        const users= await userModal.aggregate([
            {$match:{isComplete:true|| { status:false} ||{status:true}},
        
        }
       
        ]);
        res.status(200).send(users);
    } catch (error) {
        console.log(error);
        res.status(500).send(error)
    }
})

router.get ('/rejected',  async (req,res)=>{
    const previosMonth=moment()
    .month(moment().month()-1)
    .set('date',1)
    .format('YYYY-MM-DD HH:mm:ss');
    // res.status(200).send(previosMonth)
    try {
        const users= await userModal.aggregate([
            {$match:{isComplete:false,status:true},
        
        }
       
        ]);
        res.status(200).send(users);
    } catch (error) {
        console.log('error',error);
        res.status(500).send(error)
    }
})
// categories


router.get ('/phone',  async (req,res)=>{
    const previosMonth=moment()
    .month(moment().month()-1)
    .set('date',1)
    .format('YYYY-MM-DD HH:mm:ss');
    // res.status(200).send(previosMonth)
    try {
        const users= await tourModal.aggregate([
            {$match:{},
        
        }
       
        ]);
        res.status(200).send(users);
    } catch (error) {
        console.log('error',error);
        res.status(500).send(error)
    }
})
router.get ('/technology',  async (req,res)=>{
    const previosMonth=moment()
    .month(moment().month()-1)
    .set('date',1)
    .format('YYYY-MM-DD HH:mm:ss');
    // res.status(200).send(previosMonth)
    try {
        const users= await tourModal.aggregate([
            {$match:{brand:'technology'},
        
        }
       
        ]);
        res.status(200).send(users);
    } catch (error) {
        console.log('error',error);
        res.status(500).send(error)
    }
})
router.get ('/beuaty',  async (req,res)=>{
    const previosMonth=moment()
    .month(moment().month()-1)
    .set('date',1)
    .format('YYYY-MM-DD HH:mm:ss');
    // res.status(200).send(previosMonth)
    try {
        const users= await tourModal.aggregate([
            {$match:{brand:'beuaty'},
        
        }
       
        ]);
        res.status(200).send(users);
    } catch (error) {
        console.log('error',error);
        res.status(500).send(error)
    }
})
router.get ('/laptop',  async (req,res)=>{
    const previosMonth=moment()
    .month(moment().month()-1)
    .set('date',1)
    .format('YYYY-MM-DD HH:mm:ss');
    // res.status(200).send(previosMonth)
    try {
        const users= await tourModal.aggregate([
            {$match:{brand:'laptop'},
        
        }
       
        ]);
        res.status(200).send(users);
    } catch (error) {
        console.log('error',error);
        res.status(500).send(error)
    }
})
router.get ('/electronic',  async (req,res)=>{
    const previosMonth=moment()
    .month(moment().month()-1)
    .set('date',1)
    .format('YYYY-MM-DD HH:mm:ss');
    // res.status(200).send(previosMonth)
    try {
        const users= await tourModal.aggregate([
            {$match:{brand:'electronic'},
        
        }
       
        ]);
        res.status(200).send(users);
    } catch (error) {
        console.log('error',error);
        res.status(500).send(error)
    }
})
router.get ('/funatures',  async (req,res)=>{
    const previosMonth=moment()
    .month(moment().month()-1)
    .set('date',1)
    .format('YYYY-MM-DD HH:mm:ss');
    // res.status(200).send(previosMonth)
    try {
        const users= await tourModal.aggregate([
            {$match:{brand:'funatures'},
        
        }
       
        ]);
        res.status(200).send(users);
    } catch (error) {
        console.log('error',error);
        res.status(500).send(error)
    }
})
router.get ('/cars',  async (req,res)=>{
    const previosMonth=moment()
    .month(moment().month()-1)
    .set('date',1)
    .format('YYYY-MM-DD HH:mm:ss');
    // res.status(200).send(previosMonth)
    try {
        const users= await tourModal.aggregate([
            {$match:{brand:'cars'},
        
        }
       
        ]);
        res.status(200).send(users);
    } catch (error) {
        console.log('error',error);
        res.status(500).send(error)
    }
})
router.get ('/clothing',  async (req,res)=>{
    const previosMonth=moment()
    .month(moment().month()-1)
    .set('date',1)
    .format('YYYY-MM-DD HH:mm:ss');
    // res.status(200).send(previosMonth)
    try {
        const users= await tourModal.aggregate([
            {$match:{brand:'clothing'},
        
        }
       
        ]);
        res.status(200).send(users);
    } catch (error) {
        console.log('error',error);
        res.status(500).send(error)
    }
})
router.get ('/shoes',  async (req,res)=>{
    const previosMonth=moment()
    .month(moment().month()-1)
    .set('date',1)
    .format('YYYY-MM-DD HH:mm:ss');
    // res.status(200).send(previosMonth)
    try {
        const users= await tourModal.aggregate([
            {$match:{brand:'shoes'},
        
        }
       
        ]);
        res.status(200).send(users);
    } catch (error) {
        console.log('error',error);
        res.status(500).send(error)
    }
})
router.get ('/houses',  async (req,res)=>{
    const previosMonth=moment()
    .month(moment().month()-1)
    .set('date',1)
    .format('YYYY-MM-DD HH:mm:ss');
    // res.status(200).send(previosMonth)
    try {
        const users= await tourModal.aggregate([
            {$match:{brand:'houses'},
        
        }
       
        ]);
        res.status(200).send(users);
    } catch (error) {
        console.log('error',error);
        res.status(500).send(error)
    }
})
router.get ('/vacant',  async (req,res)=>{
    const previosMonth=moment()
    .month(moment().month()-1)
    .set('date',1)
    .format('YYYY-MM-DD HH:mm:ss');
    // res.status(200).send(previosMonth)
    try {
        const users= await tourModal.aggregate([
            {$match:{brand:'vacant'},
        
        }
       
        ]);
        res.status(200).send(users);
    } catch (error) {
        console.log('error',error);
        res.status(500).send(error)
    }
})
router.get ('/land',  async (req,res)=>{
    const previosMonth=moment()
    .month(moment().month()-1)
    .set('date',1)
    .format('YYYY-MM-DD HH:mm:ss');
    // res.status(200).send(previosMonth)
    try {
        const users= await tourModal.aggregate([
            {$match:{brand:'land'},
        
        }
       
        ]);
        res.status(200).send(users);
    } catch (error) {
        console.log('error',error);
        res.status(500).send(error)
    }
})
router.get ('/others',  async (req,res)=>{
    const previosMonth=moment()
    .month(moment().month()-1)
    .set('date',1)
    .format('YYYY-MM-DD HH:mm:ss');
    // res.status(200).send(previosMonth)
    try {
        const users= await tourModal.aggregate([
            {$match:{brand:'others'},
        
        }
       
        ]);
        res.status(200).send(users);
    } catch (error) {
        console.log('error',error);
        res.status(500).send(error)
    }
    
})
router.get('/const', async (req, res) => {
    const previousMonth = moment()
      .month(moment().month() - 1)
      .set('date', 1)
      .format('YYYY-MM-DD HH:mm:ss');
  
    try {
      const users = await tourModal.aggregate([
        {
          $match: {
            constDescription: { $exists: true, $ne: '' } // Fetch only when "construction" is not empty
          }
        }
      ]);
  
      res.status(200).send(users);
    } catch (error) {
      console.log('error', error);
      res.status(500).send(error);
    }
  });
  router.get('/hustle', async (req, res) => {
    const previousMonth = moment()
      .month(moment().month() - 1)
      .set('date', 1)
      .format('YYYY-MM-DD HH:mm:ss');
  
    try {
      const users = await tourModal.aggregate([
        {
          $match: {
            item: { $exists: true, $ne: '' } // Fetch only when "construction" is not empty
          }
        }
      ]);
  
      res.status(200).send(users);
    } catch (error) {
      console.log('error', error);
      res.status(500).send(error);
    }
  });
  module.exports = router;