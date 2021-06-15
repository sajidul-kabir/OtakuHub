const express = require("express");
const postController = require("../controllers/postController");
const commentRouter = require("./commentRoutes");
const authController = require("../controllers/authController");

const router = express.Router({ mergeParams: true });

router.use("/:postId/comments", commentRouter); // Comment on a specific post
router.put(
  "/:postId/upvote",
  authController.protectRoute,
  postController.upvoteAPost
);
router.put(
  "/:postId/downvote",
  authController.protectRoute,
  postController.downvoteAPost
);

router
  .route("/")
  .get(postController.getAllPosts)
  .post(authController.protectRoute, postController.CreateNewPost)
  .delete(
    authController.protectRoute,
    authController.restrictTo("admin"), // Authentication and authorization middleware
    postController.deleteAllPosts
  );

router
  .route("/:postId")
  .get(postController.getAPost)
  .delete(
    authController.protectRoute,
    authController.restrictTo("admin"),
    postController.deleteAPost
  );

module.exports = router;
