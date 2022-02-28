const { createSendToken } = require("./authController");

const User = require("../models/userModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

exports.getUserProfile = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user._id);
  console.log(user);

  if (!user) return next(new AppError("User not found", 404));

  res.json(user);
});

exports.updateMe = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user._id);

  user.name = req.body.name || user.name;
  user.email = req.body.email || user.email;

  if (req.body.password) {
    user.password = req.body.password;
  }

  const updatedUser = await user.save();

  createSendToken(updatedUser, 200, res);
});

exports.getUsers = catchAsync(async (req, res, next) => {
  const users = await User.find({});

  res.json(users);
});

exports.getUserById = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.id).select("-password");

  if (!user) return next(new AppError("User not found", 404));

  res.json(user);
});

exports.updateUser = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) return next(new AppError("User not found", 404));

  user.name = req.body.name || user.name;
  user.email = req.body.email || user.email;
  user.isAdmin = req.body.isAdmin;

  const updatedUser = await user.save();

  res.json({
    _id: updatedUser.id,
    name: updatedUser.name,
    email: updatedUser.email,
    isAdmin: updatedUser.isAdmin,
  });
});

exports.deleteUser = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) return next(new AppError("User not found", 404));

  await user.remove();
  res.json({ message: "User deleted" });
});
