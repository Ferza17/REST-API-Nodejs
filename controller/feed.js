/**
 * ========= Packages ==============
 */
const { json } = require("body-parser");
const { validationResult } = require("express-validator/check");
const fs = require("fs");
const { join } = require("path");
const path = require("path");
/**
 * ========= End Packages ==============
 */
/**
 * ========= Global Variables ==============
 */
const io = require("../socket");
/**
 * ========= End Global Variables ==============
 */
/**
 * ========= Models ==============
 */
const Post = require("../models/post");
const User = require("../models/user");
const post = require("../models/post");
/**
 * ========= End Models ==============
 */

// Get Single Post
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

// Get All Posts with pagination with Syncronous Methods
exports.getPosts = async (req, res, next) => {
  const currentPage = req.query.page || 1;
  const perPage = 2;
  // let totalItems;

  try {
    const totalItems = await Post.find().countDocuments();
    const posts = await Post.find()
      .populate("creator")
      .sort({ createdAt: -1 })
      .skip((currentPage - 1) * perPage)
      .limit(perPage);
    res.status(200).json({
      message: "Posts Fetched",
      posts: posts,
      totalItems: totalItems,
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

// Create Post
exports.createPost = async (req, res, next) => {
  const errors = validationResult(req);
  const title = req.body.title;
  const content = req.body.content;
  const userId = req.userId;
  let creator;
  // For Windows User
  const imageUrl = req.file.path.replace("\\", "/");
  const post = new Post({
    title: title,
    content: content,
    imageUrl: imageUrl,
    creator: userId,
  });
  if (!errors.isEmpty()) {
    const error = new Error("Validation Failed, entered data is incorrect.");
    error.statusCode = 422;
    throw error;
  }

  try {
    await post.save();
    const user = await User.findById(userId);
    user.posts.push(post);
    await user.save();
    io.getIO().emit("posts", {
      action: "create",
      post: {
        ...post._doc,
        creator: {
          _id: userId,
          name: user.name,
        },
      },
    });
    res.status(201).json({
      message: "Post Created!",
      post: post,
      creator: {
        _id: creator_id,
        name: creator.name,
      },
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }

    next(err);
  }
};

// Update Post
exports.updatePost = async (req, res, next) => {
  const postId = req.params.postId;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error("Validation Failed, entered data is incorrect.");
    error.statusCode = 422;
    throw error;
  }
  const title = req.body.title;
  const content = req.body.content;
  let imageUrl = req.body.imageUrl;

  if (req.file) {
    imageUrl = req.file.path;
  }

  if (!imageUrl) {
    const error = new Error("No File Picked.");
    error.statusCode = 422;
    throw error;
  }

  try {
    const post = await Post.findById(postId).populate("creator");
    if (!post) {
      const error = new Error("Could not find post.");
      error.statusCode = 404;
      throw error;
    }

    if (post.creator.toString() !== req.userId) {
      const error = new Error("Not Authorized!");
      error.statusCode = 403;
      throw error;
    }

    if (imageUrl !== post.imageUrl) {
      clearImage(post.imageUrl);
    }
    post.title = title;
    post.imageUrl = imageUrl;
    post.content = content;

    const result = await post.save();
    io.getIO().emit("posts", {
      action: "update",
      post: result,
    });
    res.status(200).json({
      message: "Post Updated!",
      post: result,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

// Delete Post
exports.deletePost = async (req, res, next) => {
  const postId = req.params.postId;
  try {
    const post = await Post.findById(postId);
    if (!post) {
      const error = new Error("Could not find post.");
      error.statusCode = 404;
      throw error;
    }
    if (post.creator.toString() !== req.userId) {
      const error = new Error("Not Authorized!");
      error.statusCode = 403;
      throw error;
    }
    clearImage(post.imageUrl);

    await Post.findByIdAndRemove(postId);
    const user = await User.findById(req.userId);
    user.posts.pull(postId);
    await user.save();
    io.getIO().emit("posts", {
      action: "delete",
      post: postId,
    });
    res.status(200).json({
      message: "Delete Post Success!",
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

// Deleting image in static file
const clearImage = (filePath) => {
  (filePath = path), join(__dirname, "..", filePath);
  fs.unlink(filePath, (err) => {
    console.log("err :>> ", err);
  });
};
