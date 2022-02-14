const fs = require('fs');
const jwt = require("jsonwebtoken");
const express = require("express");
const app = express();
const multer = require("multer");
const upload = multer({dest: 'data/imgs/'});
const router = express.Router();
const User = require("../model/userSchema");
const authenticate = require("../middleware/authenticate");
require("../db/conn");

router.get("/", (req, res) => {
  res.send("<br>Hello World from PIKLASH");
});

router.post("/testRoute", async (req, res) => {
  console.log("GOT REQ - "+req);
  const { name, email, phone, password, cpassword, testT, myFilename, imgFD} = req.body;
  console.log();
  console.log("HELLO from /testRoute");
  console.log("GOT NAME - "+name);
  console.log("GOT EMAIL - "+email);
  console.log("GOT PHONE - "+phone);
  console.log("GOT PASSWORD - "+password);
  console.log("GOT cPASSWORD - "+cpassword);
  console.log("GOT testT - "+testT);
  console.log("GOT FILENAME"+myFilename);
  // upload.single(imgFD);
  fs.open('mynewfile2.png', 'w', function (err, file) {
    if (err) throw err;
    console.log('Saved!');
  });
  console.log("Action performed");
});

router.post("/register", async (req, res) => {
  const { name, email, phone, password, cpassword, myFile, testT } = req.body;
  const img = myFile;
  // console.log("MyFile is "+myFile.name);
  // console.log(testT);
  // console.log("MyFile is "+Object.values(myFile));
  // const image =await JSON.stringify(img);
  // const {imgname} = img;
  // console.log("zzz - "+imgname);
  // console.log("BACKEND IMG WE img -> "+img);
  // console.log("BACKEND IMG WE img[0] -> "+img[0]);
  // console.log("BACKEND IMG WE img[0] Obj -> "+Object.apply(img[0]));
  // console.log("BACKEND IMG WE img[0].name -> "+img[0].name);
  // console.log("BACKEND IMG WE image -> "+image);
  // console.log("BACKEND IMG WE req.body-> "+req.body);
  // console.log("BACKEND IMG WE req.body-> "+req.body);
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
        // img,
      });
      console.log("test fetch api for IMG -> "+img);
      await user.save();

      res.status(201).json({ message: "user registered successfully" });
    }
  } catch (err) {
    console.log(err);
  }
});

router.post("/signin", async (req, res) => {
  // console.log("got -> "+req.body);
  // const fghj = await JSON.stringify(req.body);
  // console.log("FGHJKL -->>  "+fghj);
  // // console.log("FGHJKL___EMAIL -->>  "+fghj);
  // console.log("got req -> "+req);

  try {
    // console.log("got req 2 -> "+req);
    // console.log("got 2 -> "+req.body);

    const { email, password } = req.body;
    // console.log("EMAIILLL : "+email);
    if (!email || !password) {
      return res.status(400).json({ error: "EMAIL / PASSWORD required" });
    } else {
      const userLogin = await User.findOne({ email: email });
      // console.log("userLogin -> "+userLogin);
      // console.log("userLogin.name -> "+userLogin.name);

      if (userLogin) {
        let isMatch = false;
        if (password == userLogin.password) {
          isMatch = true;

          const token = await userLogin.generateAuthToken();
          // console.log("Tokenn -> "+token);
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

router.get("/profile", authenticate, (req, res) => {
  // console.log("Hello About");
  // console.log(req.rootUser);
  res.send(req.rootUser);
});

module.exports = router;
