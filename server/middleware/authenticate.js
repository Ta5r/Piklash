// import { verify } from "jsonwebtoken";
import jwt from 'jsonwebtoken';
const { verify } = jwt;
import User from "../model/userSchema.js";
// var app = express();
// app.use(cookieParser());

const Authenticate = async (req, res, next) => {
  try {
    console.log(" TOKEN READ ___ :  "+req.headers.cookie);

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
