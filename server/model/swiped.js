import pkg from "mongoose";
const { Schema, model } = pkg;

const SECRET_KEY = "OWMRWLERTJFSNCYJANCSFGHASXZRWQURCVSFDDHJ";

const swipeSchema = new Schema({
  swipedBy: {
    type: String,
    required: true,
  },
  swiped: {
    type: String,
    required: true,
  }
});

const Swipe = model("SWIPE", swipeSchema);
export default Swipe;
