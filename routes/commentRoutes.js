const express = require("express");
const commentController = require("../controllers/commentController");

const router = express.Router({ mergeParams: true });

router
  .route("/")
  .get(commentController.getAllComments)
  .post(commentController.CreateNewComment)
  .delete(commentController.deleteAllComments);

module.exports = router;
