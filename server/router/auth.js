import express from "express";
import pkg from "express";
const { Router } = pkg;
const app = express();
const router = Router();
import User from "../model/userSchema.js";
import Swipe from "../model/swiped.js";

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
  if (!selectedFile) {
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
        selectedFile,
      });
      await user.save();
      console.log("message: " + name + " registered successfully");
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

router.post("/swipe", async (req, res) => {
  console.log("swipe route");
  //registering swipe
  const { swipedBy, swiped, direction } = req.body;
  const swipe_obj = new Swipe({
    swipedBy,
    swiped,
  });
  await swipe_obj.save();
  console.log("swipe registered");
  //score
  let new_score = 0;

  const entity = await User.findOne({ _id: swiped });
  console.log("entity score : " + entity.score);
  if (direction === "left") {
    new_score = entity.score - 1;
  } else {
    new_score = entity.score + 1;
  }
  entity.score = new_score;
  console.log("entity NEW score : " + entity.score);
  await entity.save();
  console.log("record updated");
});

router.get("/test/:id", async (req, res) => {
  const user_id = req.params.id;
  // res.status(200).send({ _id : user_id});
  console.log("req params user ID -> " + user_id);
  // -----
  try {







    const swiped = await Swipe.find({ swipedBy: req.params.id });
    let swiped_array = [];
    swiped.map((test) => {
      swiped_array.push(test.swiped);
      // console.log("TEST log -> "+test.swiped);
    });
    // console.log("after push   "+swiped_array);
    // console.log(swiped_array[0]);
    // swiped_array.map((index)=>{
    //   console.log(index);
    // })

    const userProfiles = await User.find({ _id: { $nin: swiped_array } });
    // console.log(userProfiles);
    console.log(swiped);
    res.status(200).json({ userProfiles });





















  } catch (err) {
    console.log(err);
  }

  //mongodb populate ?
});

router.get("/getAllProfiles/:id", async (req, res) => {
  try {












    const swiped = await Swipe.find({ swipedBy: req.params.id });
    let swiped_array = [];
    swiped.map((test) => {
      swiped_array.push(test.swiped);
    });
    const userProfiles = await User.find({ _id: { $nin: swiped_array } });
    if (userProfiles && userProfiles.length) {
      res.status(200).json({ userProfiles });
    } else {
      return res.status(400).json({ error: "some error ocured" });
    }


















  } catch (err) {
    console.log(err);
  }
});

router.get("/profile", authenticate, (req, res) => {
  res.send(req.rootUser);
});

export default router;
