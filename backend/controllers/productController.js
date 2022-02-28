const Product = require("../models/productModel");
const catchAsync = require("../utils/catchAsync");
const APIFeatures = require("../utils/apiFeatures");
const AppError = require("../utils/AppError");

const { unlink } = require("fs");

exports.getProducts = catchAsync(async (req, res) => {
  const page = +req.query.page || 1;

  const features = new APIFeatures(Product.find({}), req.query)
    .filter()
    .sort()
    .paginate();

  const count = await Product.countDocuments(features.countQuery);
  const products = await features.query;

  res.json({
    products,
    page,
    pages: Math.ceil(count / (req.query.limit || 12)),
  });
});

exports.getProductById = catchAsync(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) return res.status(404).json({ message: "Product not found" });

  res.json(product);
});

exports.getFeaturedProducts = catchAsync(async (req, res) => {
  const products = await Product.find({}).sort({ createdAt: -1 }).limit(6);

  res.json(products);
});

exports.deleteProduct = catchAsync(async (req, res, next) => {
  const product = Product.findById(req.params.id);

  if (!product) return next(new AppError("Product not found", 404));

  await product.remove();

  res.json({ message: "Product deleted" });
});

exports.createProduct = catchAsync(async (req, res, next) => {
  const product = { ...req.body, user: req.user.id };

  product.sizes = JSON.parse(product.sizes);

  if (!req.file)
    return next(new AppError("Please upload an image of the product.", 400));

  product.image = req.file.filename;

  await Product.create(product);

  res.json({
    status: "success",
  });
});

exports.editProduct = catchAsync(async (req, res, next) => {
  const updates = { ...req.body };

  if (updates.sizes) updates.sizes = JSON.parse(updates.sizes);

  if (req.file) {
    const product = await Product.findById(req.params.id).select("image");
    updates.image = req.file.filename;
    unlink(`./public/img/products/${product.image}`, (err) => {
      if (err) console.error(err.message);
    });
  }

  const product = await Product.findByIdAndUpdate(req.params.id, updates, {
    runValidators: true,
  });

  if (!product) return next(new AppError("Product not found", 404));

  res.json({
    status: "success",
  });
});
