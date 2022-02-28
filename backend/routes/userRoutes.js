const express = require("express");

const userController = require("./../controllers/userController");
const authController = require("./../controllers/authController");

const router = express.Router();

router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.get("/logout", authController.logout);

router.use(authController.protect);

router
  .route("/profile")
  .get(userController.getUserProfile)
  .put(userController.updateMe);

router.patch(
  "/updateMyPassword",

  authController.updatePassword
);

router.use(authController.restrict);

router.route("/").get(userController.getUsers);

router
  .route("/:id")
  .get(userController.getUserById)
  .put(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;
