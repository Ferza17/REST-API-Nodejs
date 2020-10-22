/**
 * ========= Packages ==============
 */
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const http = require("http");
require("dotenv/config");

/**
 * ========= End Packages ==============
 */
/**
 * ========= Global Variable ==============
 */
const app = express();
/**
 * ========= Global Variable ==============
 */
/**
 * ========= Routes ==============
 */
const feedRoutes = require("./routes/feed");
/**
 * ========= End Routes ==============
 */
/**
 * ========= Initialize  ==============
 */
app.use(bodyParser.json());
app.use("/feed", feedRoutes);
/**
 * ========= End Initialize ==============
 */
mongoose
  .connect(process.env.MONGODB_URL)
  .then((result) => {
    console.log("server runnnig on port :>> ", process.env.PORT);
    http.createServer(app).listen(process.env.PORT);
  })
  .catch((err) => {
    console.log("err :>> ", err);
  });
