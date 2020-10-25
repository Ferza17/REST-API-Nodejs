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
const postSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      minlength: 5,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    creator: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);
/**
 * ========= End Configuration ==============
 */

module.exports = mongoose.model("Post", postSchema);
