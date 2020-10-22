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
      type: Object,
      // Will relation to user Model
      required: false,
    },
  },
  { timestamps: true }
);
/**
 * ========= End Configuration ==============
 */

module.exports = mongoose.model("Post", postSchema);
