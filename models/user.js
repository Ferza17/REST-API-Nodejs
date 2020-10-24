/**
 * ========= Packages ==============
 */
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
/**
 * ========= END Packages ==============
 */
/**
 * ========= Configuration ==============
 */
const userSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  name: {
    required: true,
    type: String,
  },
  password: {
    type: String,
    required: true,
  },
  status: {
    default: "I am New!",
    type: String,
  },
  posts: [{ type: Schema.Types.ObjectId, ref: "Post" }],
});
/**
 * ========= End Configuration ==============
 */
module.exports = mongoose.model("User", userSchema);
