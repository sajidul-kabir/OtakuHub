const express = require("express");
const communityController = require("../controllers/communityController");
const postRouter = require("./postRoutes");

const router = express.Router();

router.use("/:slug/posts", postRouter); // Post on a specific Community

router
  .route("/")
  .get(communityController.getAllCommunities)
  .post(communityController.CreateNewCommunity)
  .delete(communityController.deleteAllCommunities);

router.route("/:slug").get(communityController.getACommunity);

module.exports = router;
