const express = require("express");
const postController = require("../controllers/postController");

const router = express.Router();

router
  .route("/")
  .get(postController.getAllPosts)
  .post(postController.CreateNewPost);

router.route("/:postId").get(postController.getAPost);
module.exports = router;
