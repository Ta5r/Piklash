// import { verify } from "jsonwebtoken";
import jwt from 'jsonwebtoken';
const { verify } = jwt;
import User from "../model/userSchema.js";
// var app = express();
// app.use(cookieParser());

const Authenticate = async (req, res, next) => {
  try {
    // var get_cookies = function(request) {
    //   var cookies = {};
    //   request.headers && request.headers.cookie.split(';').forEach(function(cookie) {
    //     var parts = cookie.match(/(.*?)=(.*)$/)
    //     cookies[ parts[1].trim() ] = (parts[2] || '').trim();
    //   });
    //   return cookies;
    // };
    // console.log("hmhmhmhm --->  "+get_cookies[])

    console.log(" TOKEN READ ___ :  "+req.headers.cookie);
    // console.log(" TOKEN READ2 ___ :  "+req.cookies);

    const text = ""+req.headers.cookie;
    let len = text.length;
    let resultStr = text.slice(8, len);

    const token = resultStr;

    console.log("TOKEN __  :  !-- " + token+" --!");

    const SECRET_KEY = "OWMRWLERTJFSNCYJANCSFGHASXZRWQURCVSFDDHJ";
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
