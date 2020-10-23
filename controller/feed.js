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

exports.getPost = (req, res, next) => {
  const postId = req.params.postId;
  Post.findById(postId)
    .then((post) => {
      if (!post) {
        const error = new Error("Could not find post.");
        error.statusCode = 404;
        throw error;
      }
      res.status(200).json({
        message: "Post Fetched",
        post: post,
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.getPosts = (req, res, next) => {
  Post.find()
    .then((posts) => {
      res.status(200).json({
        message: "Posts Fetched",
        posts: posts,
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.createPost = (req, res, next) => {
  const errors = validationResult(req);
  const title = req.body.title;
  const content = req.body.content;
  // For Windows User
  const imageUrl = req.file.path.replace("\\", "/");
  const post = new Post({
    title: title,
    content: content,
    imageUrl: imageUrl,
    creator: {
      name: "Anonim",
    },
  });
  if (!errors.isEmpty()) {
    const error = new Error("Validation Failed, entered data is incorrect.");
    error.statusCode = 422;
    throw error;
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
      if (!err.statusCode) {
        err.statusCode = 500;
      }

      next(err);
    });
};
