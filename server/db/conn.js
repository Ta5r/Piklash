import mongoose from 'mongoose';

// const conn = () =>{
  // const mongoose = require("mongoose");
 const DATABASE="mongodb+srv://piklash21:PIKlash21@cluster0.gfltb.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
  mongoose
  .connect(DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("connection successful");
  })
  .catch((err) => {
    console.log(err);
  });
// };

// export default conn;