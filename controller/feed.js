/**
 * ========= Packages ==============
 */
const { json } = require("body-parser");
const { validationResult } = require("express-validator/check");
/**
 * ========= End Packages ==============
 */
/**
 * ========= Models ==============
 */
const Post = require("../models/post");
/**
 * ========= End Models ==============
 */
exports.getPosts = (req, res, next) => {
  res.status(200).json({
    posts: [
      {
        title: "First posts",
        content: "This is my first posts!",
        images: "images/Untitled2.png",
      },
    ],
  });
};

exports.createPost = (req, res, next) => {
  const errors = validationResult(req);
  const title = req.body.title;
  const content = req.body.content;
  const post = new Post({
    title: title,
    content: content,
    imageUrl: "images/Untitled2.png",
    creator: {
      name: "Anonim",
    },
  });
  if (!errors.isEmpty()) {
    return res.status(422).json({
      message: "Validation Failed, entered data is incorrect.",
      errors: errors.array(),
    });
  }
  post
    .save()
    .then((result) => {
      res.status(201).json({
        message: "Post Created!",
        post: result,
      });
    })
    .catch((err) => {
      console.log("err :>> ", err);
      res.status(500),
        json({
          message: "Something went wrong on the server.",
        });
    });
  // Create post in db
};
