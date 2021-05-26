const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const rateLimiter = require("express-rate-limit");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");

const postRouter = require("./routes/postRoutes");
const commentRouter = require("./routes/commentRoutes");
const communityRouter = require("./routes/communityRoutes");
const userRouter = require("./routes/userRoutes");

const app = express();

// Set security HTTP headers
app.use(helmet());

// Limit requests from same user
const limiter = rateLimiter({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: "Too many request from a single ip , please try again in an hour",
});
app.use("/api", limiter);

// Body parsing middleware
app.use(express.json({ limit: "10kb" }));

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// Data sanitization against xss
app.use(xss());

// Cross-Origin Resource Sharing middleware
app.use(cors());

// REST architecture
app.use("/api/communities", communityRouter);
app.use("/api/posts", postRouter);
app.use("/api/comments", commentRouter);
app.use("/api/users", userRouter);

module.exports = app;
