const jwt = require("jsonwebtoken");
const User = require("../model/userSchema");

const Authenticate = async (req, res, next) => {
  try {
    const token = req.cookie.jwtoken;
    const SECRET_KEY = "OWMRWLERTJFSNCYJANCSFGHASXZRWQURCVSFDDHJ";
    const verifyToken = jwt.verify(token, SECRET_KEY);
    const rootUser = await User.findOne({_id: verifyToken._id, "tokens.token":token});
    if(!rootUser) {
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

module.exports = Authenticate;
