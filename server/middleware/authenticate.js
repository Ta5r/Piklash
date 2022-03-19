import jwt from 'jsonwebtoken';
const { verify } = jwt;
import User from "../model/userSchema.js";
import dotenv from "dotenv";
dotenv.config({});

const Authenticate = async (req, res, next) => {
  try {
    const text = ""+req.headers.cookie;
    let len = text.length;
    let resultStr = text.slice(8, len);
    const token = resultStr;
    const SECRET_KEY = process.env.SECRET_KEY;
    const verifyToken = verify(token, SECRET_KEY);
    const rootUser = await User.findOne({
      _id: verifyToken._id,
      "tokens.token": token,
    });
    if (!rootUser) {
      throw new Error("User not found");
    }
    req.token = token;
    req.rootUser = rootUser;
    next();
  } catch (err) {
    res.status(401).send("UnAuthorized : No Token provided");
    console.log(err);
  }
};

export default Authenticate;
