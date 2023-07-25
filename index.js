const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const register = require("./routes/register");
const login = require("./routes/login");
const morgan = require('morgan')
const bodyParser = require('body-parser');
const stripe = require("./routes/stripe");
const productsRoute = require("./routes/products");
const users=require('./routes/users')

const products = require("./products");

const corsOptions ={
  origin:'*', 
  credentials:true,            //access-control-allow-credentials:true
  optionSuccessStatus:200,
}


const app = express();

require("dotenv").config();
app.use(morgan('common'))
app.use(bodyParser.json({limit: '50mb'}));
app.use(cors());
app.use(express.json());
app.use(cors(corsOptions));

app.get("/", (req, res) => {
  res.send("Welcome our to online shop API...");
});
app.use("/api/users", users)
app.use("/api/register", register);
app.use("/api/login", login);
app.use("/api/stripe", stripe);
app.use("/api/products", productsRoute);







mongoose
  .connect(process.env.DB_URI)
  .then(() => {
    app.listen(process.env.PORT, () => console.log(`Server running on port ${port}`));
  })
  .catch((error) => console.log(`${error} did not connect`));