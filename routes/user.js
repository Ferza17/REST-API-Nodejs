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
const userController = require("../controller/user");
/**
 * ========= End Controller ==============
 */
/**
 * ========= Models ==============
 */
const User = require("../models/user");
/**
 * ========= End Models ==============
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

// User Login
router.post("/login", userController.login);

// Updating user
router.put(
  "/signup",
  [
    body("email")
      .isEmail()
      .withMessage("Please Enter a valid Email !.")
      .custom((value, { req }) => {
        return User.findOne({ email: value }).then((user) => {
          if (user) {
            return Promise.reject("Email Address already Exists!");
          }
        });
      })
      .normalizeEmail(),
    body("password").trim().isLength({ min: 5 }),
    body("name").trim().not().isEmpty(),
  ],
  userController.signUp
);
/**
 * ========= End Routes ==============
 */

module.exports = router;
