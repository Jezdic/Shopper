const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");
const authController = require("../controllers/authController");

router.use(authController.protect);

router
  .route("/")
  .get(authController.restrict, orderController.getOrders)
  .post(orderController.createOrder);

router.use(authController.restrict);
router
  .route("/:id")
  .get(orderController.getOrderById)
  .delete(orderController.deleteOrder)
  .patch(orderController.editOrder);

module.exports = router;
