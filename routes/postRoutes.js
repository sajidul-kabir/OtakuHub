const express = require("express");
const postController = require("../controllers/postController");
const commentRouter = require("./commentRoutes");

const router = express.Router({ mergeParams: true });

router.use("/:postId/comments", commentRouter); // Comment on a specific post

router
  .route("/")
  .get(postController.getAllPosts)
  .post(postController.CreateNewPost)
  .delete(postController.deleteAllPosts);

router.route("/:postId").get(postController.getAPost);

module.exports = router;
