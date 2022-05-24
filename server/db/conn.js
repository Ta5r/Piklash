const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config({});

mongoose
  .connect(process.env.NEW_URI1, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("connection successful");
  })
  .catch((err) => {
    console.log("Some error occured "+err);
  });