const mongoose = require("mongoose");
DATABASE="mongodb+srv://piklash21:PIKlash21@cluster0.gfltb.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
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