const {Users, User} =require('../models/user')
const {auth,isUser,isAdmin}=require('../middleware/auth')
const moment = require('moment')
const router =require("express").Router()


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


router.get ('/stats/all',  async (req,res)=>{
    const previosMonth=moment()
    .month(moment().month()-1)
    .set('date',1)
    .format('YYYY-MM-DD HH:mm:ss');
    // res.status(200).send(previosMonth)
    try {
        const users= await User.aggregate([
            {$match:{},
        
        }
       
        ]);
        res.status(200).json(users);
    } catch (error) {
        console.log(error);
        res.status(500).send(error)
    }
})

router.delete("/:id", async (req, res) => {
    try {
      await User.findByIdAndDelete(req.params.id);
      res.status(200).send("Product has been deleted...");
    } catch (error) {
      res.status(500).send(error);
    }
  });
module.exports= router;