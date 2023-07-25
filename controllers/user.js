import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";

import UserModal from "../models/user.js";
import { Login } from "../middleware/RequireLogin.js";

const secret = "test";

export const signin = async (req, res) => {
  const { email, password, task } = req.body;

  try {
    const oldUser = await UserModal.findOne({ email });
    if (!oldUser)
      return res.status(404).json({ message: "User doesn't exist" });

    const isPasswordCorrect = await bcrypt.compare(task, oldUser.task);

    if (!isPasswordCorrect)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ email: oldUser.email, id: oldUser._id }, secret, {
      expiresIn: "500h",
    });

    res.status(200).json({ result: oldUser, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
    console.log(error);
  }
};

export const signup = async (req, res) => {
  const {
    email,
    phone,
    img,
    isSeller,
    location,
    country,
    city,
    address,
    date,
    password,
    task,
    tell,
    firstname,
    lastname,
    createdAt,
  } = req.body;
  try {
    const oldUser = await UserModal.findOne({ email });

    if (oldUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(task, 12);

    const result = await UserModal.create({
      email,
      task: hashedPassword,
      name: `${firstname} ${lastname}`,
      tell,
      phone,
      isSeller,
      location,
      country,
      city,
      address,
      date,
      img,
      password,
      createdAt: new Date().toISOString(),
    });

    const token = jwt.sign(
      {
        tell: result.tell,
        img:result.img,
        name: result.name,
        email: result.email,
        phone: result.phone,
        isSeller: result.isSeller,
        country: result.country,
        city: result.city,
        address: result.address,
        date: result.date,
        location: result.location,
        id: result._id,
      },
      secret,
      {
        expiresIn: "500h",
      }
    );
    res.status(201).json({ result, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
    console.log(error);
  }
};

export const googleSignIn = async (req, res) => {
  const { email, name, token, googleId } = req.body;

  try {
    const oldUser = await UserModal.findOne({ email });
    if (oldUser) {
      const result = { _id: oldUser._id.toString(), email, name };
      return res.status(200).json({ result, token });
    }

    const result = await UserModal.create({
      email,
      name,
      googleId,
    });

    res.status(200).json({ result, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
    console.log(error);
  }
};

export const AllUsers = async (req, res) => {
  const { page } = req.query;
  try {
    // const tours = await TourModal.find();
    // res.status(200).json(tours);

    const tours = await UserModal.find();
    res.json(tours);
  } catch (error) {
    res.status(404).json({ message: "Something went wrong" });
  }
};

export const getUser = async (req, res) => {
  const { id } = req.params;
  try {
    const tour = await UserModal.findById(id);
    res.status(200).json(tour);
  } catch (error) {
    res.status(404).json({ message: "Something went wrong" });
  }
};
export const updateStatusTour = async (req, res) => {
  const { userId } = req.params;
  const { status } = req.body;

  try {
    const user = await UserModal.findByIdAndUpdate(
      userId,
      { status },
      { new: true }
    );
    res.json(user);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const userStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await UserModal.findByIdAndUpdate(
      id,
      { status: true },
      { new: true }
    );

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.json({ message: "Product status updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const deleteTour = async (req, res) => {
  const { id } = req.params;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ message: `No tour exist with id: ${id}` });
    }
    await TourModal.findByIdAndRemove(id);
    res.json({ message: "Tour deleted successfully" });
  } catch (error) {
    res.status(404).json({ message: "Something went wrong" });
  }
};

export const updateTour = async (req, res) => {
  UserModal.findOneAndUpdate(
    {},
    { $set: { status: req.body.status } },
    { new: true }
  )
    .then((updatedStatus) => {
      res.json(updatedStatus);
    })
    .catch((error) => {
      console.error(error);
      res
        .status(500)
        .json({ error: "An error occurred while updating the status" });
    });
};
export const forgotPassword = async (req, res) => {
  const { email, message } = req.body;

  try {
    const oldUser = await UserModal.findOne({ email });
    if (!oldUser) {
      return res
        .status(400)
        .json({ message: "user with that email does not exist" });
    }
    const sec = secret + oldUser.password;
    const token = jwt.sign({ email: oldUser.email, id: oldUser._id }, sec, {
      expiresIn: "100m",
    });
    const link = `http://localhost:5000/reset-password/${oldUser._id}/${token}`;

    // console.log(link);
    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "petergachau57@gmail.com",
        pass: "atgwlwufhipufmte",
        //   kvoqqhjcvsmgupko
      },
    });

    var mailOptions = {
      from: "petergachau57@gmail.com",
      to: email,
      subject: "Notification from dull dush",
      text: link,
      html: `
      <h3>Notification</h3>
      <ul>
      <li>
      Message:${message}
      </li>
      </ul>
      
      
      `,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
    console.log(link);
  } catch (error) {}
};

export const resetPassword = async (req, res) => {
  const { id, token } = req.params;
  console.log(req.params);
  const oldUser = await UserModal.findOne({ _id: id });
  if (!oldUser) {
    return res
      .status(400)
      .json({ message: "user with that email does not exist" });
  }
  const sec = secret + oldUser.password;

  try {
    const verify = jwt.verify(token, sec);
    res.render("index", { email: verify.email, status: " not Verified" });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "not verified" });
  }
};

export const changePassword = async (req, res) => {
  const { id, token } = req.params;
  const { password } = req.body;
  const oldUser = await UserModal.findOne({ _id: id });
  if (!oldUser) {
    return res
      .status(400)
      .json({ message: "user with that email does not exist" });
  }
  const sec = secret + oldUser.password;

  try {
    const verify = jwt.verify(token, sec);
    const encryptedPassword = await bcrypt.hash(password, 10);

    await UserModal.updateOne(
      {
        _id: id,
      },
      {
        $set: {
          password: encryptedPassword,
        },
      }
    );
    res.render("index", { email: verify.email, status: "Verified" });

    //   return res.status(400).json({message:'password updated'})
  } catch (error) {
    console.log(error);
  }
};


export const Follow =async(req,res)=>{
  UserModal.findByIdAndUpdate(req.body.followId,{
    $push:{followers:req.user._id}
},{
    new:true
},(err,result)=>{
    if(err){
        return res.status(422).json({error:err})
    }
  UserModal.findByIdAndUpdate(req.user._id,{
      $push:{following:req.body.followId}
      
  },{new:true}).select("-password").then(result=>{
      res.json(result)
  }).catch(err=>{
      return res.status(422).json({error:err})
  })

}
)

}

export const unFollow=(req,res)=>{
  UserModal.findByIdAndUpdate(req.body.unfollowId,{
    $pull:{followers:req.user._id}
},{
    new:true
},(err,result)=>{
    if(err){
        return res.status(422).json({error:err})
    }
  UserModal.findByIdAndUpdate(req.user._id,{
      $pull:{following:req.body.unfollowId}
      
  },{new:true}).select("-password").then(result=>{
      res.json(result)
  }).catch(err=>{
      return res.status(422).json({error:err})
  })

}
)
}