const { Product } = require("../models/product");
const {auth1 , isUser, isAdmin } = require("../middleware/auth");
const { auth } = require("../middleware/auth1");
const cloudinary = require("../utils/cloudinary");

const router = require("express").Router();

//CREATE

router.post('/',async(req,res)=>{
  const { name, brand, desc, price,ram,rom,battery,camera,os,sim, image,No,location } = req.body;

  try {
    if (image) {
      const uploadedResponse = await cloudinary.uploader.upload(image, {
        upload_preset: "peter-main",
      });

      if (uploadedResponse) {
        const product = new Product({
          name,
          brand,
          desc,
          price,
          No,
          location,
          image: uploadedResponse,
          creator: req.userId,
          ram,
          rom,
          battery,
          camera,
          os,
          sim,
          

        });

        const savedProduct = await product.save();
        res.status(200).send(savedProduct);
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
})

//DELETE

router.delete("/:id", async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).send("Product has been deleted...");
  } catch (error) {
    res.status(500).send(error);
  }
});

//GET ALL PRODUCTS

router.get("/", async (req, res) => {
  
  try {
   const products =await Product.find()

    res.status(200).send(products);
  } catch (error) {
    res.status(500).send(error);
  }
});

//GET PRODUCT

router.get("/find/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.status(200).send(product);
  } catch (error) {
    res.status(500).send(error);
  }
});

//UPDATE

router.put("/:id",  async (req, res) => {
  if(req.body.productImg){
    try {
      const destry=await cloudinary.uploader.destroy(
        req.body.product.image.public_id
      );
      if (destry){
        const uploaded=await cloudinary.uploader.upload(
          req.body.productImg,{
            upload_preset: "peter-main",

          }
        );
        if(uploaded){
          const upadte=await Product.findByIdAndUpdate(
            req.params.id,
            {
              $set: {
                ...req.body.product,
                image:uploaded,
              }
            },
            {new:true}
          )
          res.status(200).send(upadte)
        }
      }
    } catch (error) {
      console.log(error);
    }
  }else{
    try {
      const updatedProduct = await Product.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).send(updatedProduct);
    } catch (error) {
      res.status(500).send(error);
    }
  }
 
});

router.get('/:id' ,  async(req,res)=>{
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ message: "User doesn't exist" });
  }
  const userTours = await TourModal.find({ creator: id });
  res.status(200).json(userTours);
})

module.exports = router;
