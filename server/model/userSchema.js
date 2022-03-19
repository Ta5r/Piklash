import pkg from 'mongoose';
import jwt from 'jsonwebtoken';
const { Schema, model } = pkg;
const { sign } = jwt;
import dotenv from "dotenv";
dotenv.config({});
const SECRET_KEY = process.env.SECRET_KEY;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  cpassword: {
    type: String,
    required: true,
  },
  score: {
    type: Number,
    default: 0,
  },
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
  selectedFile: String,
});

userSchema.methods.generateAuthToken = async function () {
  try {
    let token = sign({ _id: this._id }, SECRET_KEY);
    this.tokens = this.tokens.concat({token:token});
    await this.save();
    return token;
  } catch (err) {
    {
      console.log(err);
    }
  }
};

const User = model("USER", userSchema);
export default User;
