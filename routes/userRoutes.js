const express = require("express");
const userController = require("../controllers/userController");
const authController = require("../controllers/authController");

const router = express.Router({mergeParams:true});

router.route("/signup").post(authController.signup);
router.route("/login").post(authController.login);

router
  .route("/updatePassword")
  .patch(authController.protectRoute, authController.updatePassword);

router
  .route("/")
  .get(userController.getAllUsers)
  .delete(userController.deleteAllUsers);

  router
  .route("/:userId").get(userController.getAUser)
module.exports = router;
