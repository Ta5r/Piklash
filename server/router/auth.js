const jwt = require("jsonwebtoken");
const express = require("express");
const router = express.Router();
const User = require("../model/userSchema");
const authenticate = require("../middleware/authenticate");
require("../db/conn");

router.get("/", (req, res) => {
  res.send("<br>Hello World from PIKLASH");
});

router.post("/register", async (req, res) => {
  const { name, email, phone, password, cpassword } = req.body;
  //validation
  if (!name || !email || !phone || !password || !cpassword) {
    return res.status(422).json({ error: "plz fill all details" });
  }
  try {
    const userExist = await User.findOne({ email: email });

    if (userExist) {
      return res.status(422).json({ error: "user already exists" });
    } else if (password != cpassword) {
      return res.status(422).json({ error: "passwords don't match" });
    } else {
      const user = new User({
        name,
        email,
        phone,
        password,
        cpassword,
      });

      await user.save();

      res.status(201).json({ message: "user registered successfully" });
    }
  } catch (err) {
    console.log(err);
  }
});

router.post("/signin", async (req, res) => {
  console.log(req.body);

  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "EMAIL / PASSWORD required" });
    } else {
      const userLogin = await User.findOne({ email: email });
      console.log(userLogin);
      console.log(userLogin.name);

      if (userLogin) {
        let isMatch = false;
        if (password == userLogin.password) {
          isMatch = true;
        }
        const token = await userLogin.generateAuthToken();
        console.log(token);
        res.cookie("jwtoken", token, {
          expires: new Date(Date.now() + 25892000000),
          httpOnly: true,
        });

        if (isMatch) {
          res.json({ userLogin }).status(200);
        } else {
          res.json({ message: "NO SUCH COMBINATION FOUND" }).status(400);
        }
      } else {
        return res.status(400).json({ error: "WRONG EMAIL" });
      }
    }
  } catch (err) {
    console.log(err);
  }
});

router.get('/profile',authenticate,(req,res)=>{
  console.log("Hello About");
  res.send("Hello from About Route from SERVER");
});

module.exports = router;
