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
 * ========= Routes ==============
 */

// GET SINGLE POST
router.get("/post/:postId", feedController.getPost);

//  GET  feed/posts
router.get("/posts", feedController.getPosts);
// Post feed/posts
router.post(
  "/post",
  [
    body("title").trim().isLength({ min: 5 }),
    body("content").trim().isLength({ min: 5 }),
  ],
  feedController.createPost
);

// Updating Post
router.put(
  "/post/:postId",
  [
    body("title").trim().isLength({ min: 5 }),
    body("content").trim().isLength({ min: 5 }),
  ],
  feedController.updatePost
);

// Deleting post
router.delete("/post/:postId", feedController.deletePost);
/**
 * ========= End Routes ==============
 */
module.exports = router;
