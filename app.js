const path = require("path");
const express = require("express");
const postRouter = require("./routes/postRoutes");
const commentRouter = require("./routes/commentRoutes");

const app = express();

app.use(express.json());

app.use("/api/posts", postRouter);
app.use("/api/comments", commentRouter);

module.exports = app;
