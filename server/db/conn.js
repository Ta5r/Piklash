import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config({});

const db = process.env.MONGO_URI;
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("connection successful");
  })
  .catch((err) => {
    console.log("Following error occured : ");
    console.log(err);
  });