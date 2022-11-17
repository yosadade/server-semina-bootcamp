const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const notFoundMiddleware = require("./apps/middlewares/not-found");
const handleErrorMiddleware = require("./apps/middlewares/handler-error");

const app = express();

// router
const categoriesRouter = require("./apps/api/v1/categories/router");
const imagesRouter = require("./apps/api/v1/images/router");

const v1 = "/api/v1/cms";

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  // req.query digunakan untuk filter / pagination
  res.status(200).json({
    message: "Welcome to API semina",
  });
});

app.use(v1, categoriesRouter);
app.use(v1, imagesRouter);

app.use(notFoundMiddleware);
app.use(handleErrorMiddleware);

module.exports = app;
