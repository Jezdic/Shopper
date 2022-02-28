const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
const authController = require("../controllers/authController");
const { resizeUserPhoto, uploadPhoto } = require("../utils/photoUpload");

router
  .route("/")
  .get(productController.getProducts)
  .post(
    authController.protect,
    authController.restrict,
    uploadPhoto,
    resizeUserPhoto,
    productController.createProduct
  );

router.route("/featured").get(productController.getFeaturedProducts);

router
  .route("/:id")
  .get(productController.getProductById)
  .delete(
    authController.protect,
    authController.restrict,
    productController.deleteProduct
  )
  .patch(
    authController.protect,
    authController.restrict,
    uploadPhoto,
    resizeUserPhoto,
    productController.editProduct
  );
module.exports = router;
