const Order = require('../Model/orderModel');
const Product = require('../Model/productModel');
const AllEmail = require('../utils/email');
// const BusinessUser = require('../Model/businessUserModel');
// const User = require('./../Model/userModel');
const catchAsync = require('../utils/catchAsync');
const factory = require('./handlerFactory');

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

exports.updateOrder = catchAsync(async (req, res, next) => {
  req.body.tags = req.body.tags.replace(/\s/g, ' ').split(',');
  // 2) Filtered out fields names that are allowed to be updated
  const filteredBody = filterObj(req.body, 'user', 'tags');

  // 3) Update user document
  // Validator not working!!!
  const Updatedorder = await Order.findByIdAndUpdate(
    req.params.OrderId,
    filteredBody,
    {
      new: true,
      upsert: true,
    }
  );
  res.status(200).json({
    status: 'success',
    data: {
      Updatedorder,
    },
  });
});

exports.updateShiping = catchAsync(async (req, res, next) => {
  const filteredBody = filterObj(req.body, 'logisticName', 'trackingNum');

  const Updatedshipedorder = await Order.findByIdAndUpdate(
    req.body.OrderId,
    filteredBody,
    {
      new: true,
    }
  );

  Updatedshipedorder.status = 'Shipped';
  Updatedshipedorder.shippedAt = Date.now();
  await Updatedshipedorder.save();

  const order = await Order.findById(Updatedshipedorder._id);
  const product = await Product.findById(order.product);
  // const cart = await Cart.findById(order.cart);

  const url = `${req.protocol}://${req.get('host')}/dashboard`;

  await new AllEmail.OrderEmail(order, url, product).sendShipEmail();

  res.status(200).json({
    status: 'success',
    data: {
      Updatedshipedorder,
    },
  });
});

exports.updateDelivery = catchAsync(async (req, res, next) => {
  const order = await Order.findById(req.params.OrderId);

  order.status = 'Delivered';
  order.deliveredAt = Date.now();
  await order.save();

  const product = await Product.findById(order.product);
  // const cart = await Cart.findById(order.cart);

  const url = `${req.protocol}://${req.get('host')}/dashboard`;

  await new AllEmail.OrderEmail(order, url, product).sendDeliveryEmail();
  res.status(200).json({
    status: 'success',
    data: {
      order,
    },
  });
});

exports.getAllOrders = factory.getAll(Order);
