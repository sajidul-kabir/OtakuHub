const express = require("express");
const postRouter = require("./routes/postRoutes");
const commentRouter = require("./routes/commentRoutes");
const communityRouter = require("./routes/communityRoutes");
const cors=require('cors')
const app = express();

app.use(express.json());
app.use(cors())
app.use("/api/communities", communityRouter);
app.use("/api/posts", postRouter);
app.use("/api/comments", commentRouter);

module.exports = app;
