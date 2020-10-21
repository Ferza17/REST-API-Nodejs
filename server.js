/**
 * ========= Packages ==============
 */
const express = require("express");
const bodyParser = require("body-parser");
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
app.listen(8080);
