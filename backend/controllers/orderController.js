const catchAsync = require("../utils/catchAsync");
const Order = require("../models/orderModel");
const Product = require("../models/productModel");
const AppError = require("../utils/appError");
const Stripe = require("stripe");

const stripe = new Stripe(process.env.STRIPE_SECRET);

exports.getOrders = catchAsync(async (req, res, next) => {
  const orders = await Order.find({}).populate("user", "name");

  res.json(orders);
});

exports.createOrder = catchAsync(async (req, res, next) => {
  const {
    orderItems,
    shippingAddress,
    paymentType,
    courierInstructions,
    paymentId,
  } = req.body;
  console.log(req.body);

  if (!orderItems || (orderItems && orderItems.length === 0))
    return next(new AppError("Items cannot be empty", 400));

  let itemsPrice = 0;

  for (const item of orderItems) {
    const product = await Product.findById(item.product);
    itemsPrice += product.price;
  }

  const shippingPrice = itemsPrice >= 50 ? 0 : 10;

  const totalPrice = (itemsPrice + shippingPrice).toFixed(2);

  const completedOrder = {
    user: req.user.id,
    orderItems,
    shippingAddress,
    paymentType,
    shippingPrice,
    itemsPrice,
    totalPrice,
    courierInstructions,
  };

  if (paymentId) {
    const payment = await stripe.paymentIntents.create({
      amount: totalPrice * 100,
      currency: "USD",
      payment_method: paymentId,
      confirm: true,
    });

    completedOrder.isPaid = true;

    console.log(payment);
  }

  const order = await Order.create(completedOrder);

  res.status(201).json(order);
});

exports.getOrderById = catchAsync(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order) return next(new AppError("Order not found", 404));

  res.json(order);
});

exports.deleteOrder = catchAsync(async (req, res, next) => {
  const order = await Order.findByIdAndDelete(req.params.id);

  if (!order) return next(new AppError("Order not found", 404));

  res.status(203).json({ status: "success" });
});

exports.editOrder = catchAsync(async (req, res, next) => {
  const order = await Order.findByIdAndUpdate(req.params.id, {
    runValidators: true,
  });

  if (!order) return next(new AppError("Order not found", 404));

  res.json({
    status: "success",
  });
});
