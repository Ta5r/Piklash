import express from "express";
import pkg from 'express';
const { Router } = pkg;
const app = express();
const router = Router();
import User from "../model/userSchema.js";

import authenticate from "../middleware/authenticate.js";
import "../db/conn.js";

router.get("/", (req, res) => {
  res.send("<br>Hello World from PIKLASH");
});

router.post("/register", async (req, res) => {
  const { name, email, phone, password, cpassword, selectedFile } = req.body;
  //validation
  if (!name || !email || !phone || !password || !cpassword) {
    return res.status(422).json({ error: "plz fill all details" });
  }
  if(!selectedFile)
  {
    console.log("File not recieved");
    return res.status(422).json({ error: "file not recieved" });
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
        selectedFile
      });
      await user.save();
      console.log("message: user registered successfully");
      res.status(201).json({ message: "user registered successfully" });
    }
  } catch (err) {
    console.log(err);
  }
});

router.post("/signin", async (req, res) => {
  
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "EMAIL / PASSWORD required" });
    } else {
      const userLogin = await User.findOne({ email: email });
      if (userLogin) {
        let isMatch = false;
        if (password == userLogin.password) {
          isMatch = true;

          const token = await userLogin.generateAuthToken();
          res.cookie("jwtoken", token, {
            expires: new Date(Date.now() + 25892000000),
            httpOnly: true,
          });
        }
        if (isMatch) {
          res.status(200).json({ userLogin });
        } else {
          res.status(400).json({ message: "NO SUCH COMBINATION FOUND" });
        }
      } else {
        return res.status(400).json({ error: "WRONG EMAIL" });
      }
    }
  } catch (err) {
    console.log(err);
  }
});

router.get("/getAllProfiles", async (req,res) => {
  try{
    const userProfiles = await User.find({});
    if(userProfiles){
      res.status(200).json({userProfiles});
    }
    else{
      return res.status(400).json({error: "some error ocured"});
    }
  }
  catch(err){
    console.log(err);
  }
  
});

router.get("/profile", authenticate, (req, res) => {
  res.send(req.rootUser);
});

export default router;
