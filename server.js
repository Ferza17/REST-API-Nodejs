/**
 * ========= Packages ==============
 */
const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const http = require("http");
const multer = require("multer");
require("dotenv/config");
// For Windows User
const { uuidv4 } = require("uuid");
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
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "images");
  },
  filename: function (req, file, cb) {
    cb(null, uuidv4());
  },
});

const filter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    return cb(null, true);
  } else {
    cb(null, false);
  }
};
/**
 * ========= Routes ==============
 */
const feedRoutes = require("./routes/feed");
const userRoutes = require("./routes/user");
/**
 * ========= End Routes ==============
 */
/**
 * ========= Initialize  ==============
 */
app.use(bodyParser.json());
app.use(
  multer({
    storage: storage,
    fileFilter: filter,
  }).single("image")
);
app.use("/user", userRoutes);
app.use("/feed", feedRoutes);
app.use("/images", express.static(path.join(__dirname, "images")));

app.use((error, req, res, next) => {
  console.log("error :>> ", error);
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({
    message: message,
    data: data,
  });
});
/**
 * ========= End Initialize ==============
 */
mongoose
  .connect(process.env.MONGODB_URL)
  .then((result) => {
    const server = http.createServer(app).listen(process.env.PORT);
    const io = require("./socket").init(server);
    io.on("connection", (socket) => {
      console.log("Client Connected! ");
    });
  })
  .catch((err) => {
    console.log("err :>> ", err);
  });
