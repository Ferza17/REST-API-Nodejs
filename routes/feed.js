/**
 * ========= Packages ==============
 */
const express = require("express");
const { body } = require("express-validator");
/**
 * ========= End Packages ==============
 */
/**
 * ========= Controller ==============
 */
const feedController = require("../controller/feed");
/**
 * ========= End Controller ==============
 */
/**
 * ========= Global Variable ==============
 */
const router = express.Router();
/**
 * ========= End Global Variable ==============
 */
/**
 * ========= Middleware ==============
 */
const isAuth = require("../middleware/auth");
/**
 * ========= End Middleware ==============
 */
/**
 * ========= Routes ==============
 */

// GET SINGLE POST
router.get("/post/:postId", isAuth, feedController.getPost);

//  GET  feed/posts
router.get("/posts", isAuth, feedController.getPosts);
// Post feed/posts
router.post(
  "/post",
  isAuth,
  [
    body("title").trim().isLength({ min: 5 }),
    body("content").trim().isLength({ min: 5 }),
  ],
  feedController.createPost
);

// Updating Post
router.put(
  "/post/:postId",
  isAuth,
  [
    body("title").trim().isLength({ min: 5 }),
    body("content").trim().isLength({ min: 5 }),
  ],
  feedController.updatePost
);

// Deleting post
router.delete("/post/:postId", isAuth, feedController.deletePost);
/**
 * ========= End Routes ==============
 */
module.exports = router;
