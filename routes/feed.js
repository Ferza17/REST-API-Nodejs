/**
 * ========= Packages ==============
 */
const express = require("express");
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

//  GET  feed/posts
router.get("/posts", feedController.getPosts);
// Post feed/posts
router.get("/post", feedController.createPost);
/**
 * ========= End Routes ==============
 */
module.exports = router;
