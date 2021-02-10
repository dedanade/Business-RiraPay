const moment = require('moment');
const Order = require('../Model/orderModel');
const Product = require('../Model/productModel');
const AllEmail = require('../utils/email');
// const BusinessUser = require('../Model/businessUserModel');
// const User = require('./../Model/userModel');
const catchAsync = require('../utils/catchAsync');
const factory = require('./handlerFactory');
const BusinessAccount = require('../Model/businessAccount');
const BusinessUser = require('../Model/businessUserModel');

//Today
const startToday = moment().startOf('day').toDate(); // set to 12:00 am today
const endToday = moment().endOf('day').toDate(); // set to 23:59 pm today

//This Week
const startWeek = moment().startOf('isoWeek').toDate(); // set to 12:00am of Monday according to ISO 8601
const endWeek = moment().endOf('isoWeek').toDate(); // set to 23:59 pm of Sunday

// This Month
const startMonth = moment().startOf('month').toDate(); // set to 12:00 for the first day of th month
const endMonth = moment().endOf('month').toDate(); // set to 23:59 pm of the last day of the week

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

// FETCH DAILY, LIFETIME AND MONTHLY SALES

// Sale

exports.salesToday = catchAsync(async (req, res, next) => {
  const businessUser = await BusinessUser.findById(req.businessUser.id);
  const businessAccount = await BusinessAccount.findById(
    businessUser.businessAccount
  );
  const salesOrdersToday = await Order.find({
    _id: businessAccount.orders,
    createdAt: {
      $gte: startToday,
      $lte: endToday,
    },
  });

  const arraySalesToday = [];

  salesOrdersToday.forEach((e) => {
    arraySalesToday.push(e.total);
  });
  const sumOfCartSalesToday = arraySalesToday
    .reduce((a, b) => a + b, 0)
    .toLocaleString();

  res.status(200).json({
    status: 'success',
    data: {
      sumOfCartSalesToday,
    },
  });
});

exports.salesThisWeek = catchAsync(async (req, res, next) => {
  const businessUser = await BusinessUser.findById(req.businessUser.id);
  const businessAccount = await BusinessAccount.findById(
    businessUser.businessAccount
  );

  const salesOrdersWeek = await Order.find({
    _id: businessAccount.orders,
    createdAt: {
      $gte: startWeek,
      $lte: endWeek,
    },
  });

  const arraySalesWeek = [];

  salesOrdersWeek.forEach((e) => {
    arraySalesWeek.push(e.total);
  });
  const sumOfCartSalesWeek = arraySalesWeek
    .reduce((a, b) => a + b, 0)
    .toLocaleString();

  res.status(200).json({
    status: 'success',
    data: {
      sumOfCartSalesWeek,
    },
  });
});
exports.salesThisMonth = catchAsync(async (req, res, next) => {
  const businessUser = await BusinessUser.findById(req.businessUser.id);
  const businessAccount = await BusinessAccount.findById(
    businessUser.businessAccount
  );

  const salesOrdersMonth = await Order.find({
    _id: businessAccount.orders,
    createdAt: {
      $gte: startMonth,
      $lte: endMonth,
    },
  });

  const arraySalesMonth = [];

  salesOrdersMonth.forEach((e) => {
    arraySalesMonth.push(e.total);
  });
  const sumOfCartSalesMonth = arraySalesMonth
    .reduce((a, b) => a + b, 0)
    .toLocaleString();

  res.status(200).json({
    status: 'success',
    data: {
      sumOfCartSalesMonth,
    },
  });
});

exports.salesLifeTime = catchAsync(async (req, res, next) => {
  const businessUser = await BusinessUser.findById(req.businessUser.id);
  const businessAccount = await BusinessAccount.findById(
    businessUser.businessAccount
  );
  const salesOrdersLifeTime = await Order.find({
    _id: businessAccount.orders,
  });

  const arraySalesLifeTime = [];

  salesOrdersLifeTime.forEach((e) => {
    arraySalesLifeTime.push(e.total);
  });
  const sumOfCartSalesLifeTime = arraySalesLifeTime
    .reduce((a, b) => a + b, 0)
    .toLocaleString();

  res.status(200).json({
    status: 'success',
    data: {
      sumOfCartSalesLifeTime,
    },
  });
});

// TRANSACTION!!

exports.TransToday = catchAsync(async (req, res, next) => {
  const businessUser = await BusinessUser.findById(req.businessUser.id);
  const businessAccount = await BusinessAccount.findById(
    businessUser.businessAccount
  );

  const TransOrdersToday = await Order.find({
    _id: businessAccount.orders,
    status: ['Paid', 'Shipped', 'Delivered', 'Completed', 'Canceled'],
    paidAt: {
      $gte: startToday,
      $lte: endToday,
    },
  });

  const ArrayTranToday = [];

  TransOrdersToday.forEach((e) => {
    ArrayTranToday.push(e.total);
  });

  const sumOfTransToday = ArrayTranToday.reduce(
    (a, b) => a + b,
    0
  ).toLocaleString();

  res.status(200).json({
    status: 'success',
    data: {
      sumOfTransToday,
    },
  });
});
exports.TransThisWeek = catchAsync(async (req, res, next) => {
  const businessUser = await BusinessUser.findById(req.businessUser.id);
  const businessAccount = await BusinessAccount.findById(
    businessUser.businessAccount
  );

  const TransOrdersWeek = await Order.find({
    _id: businessAccount.orders,
    status: ['Paid', 'Shipped', 'Delivered', 'Completed', 'Canceled'],
    paidAt: {
      $gte: startWeek,
      $lte: endWeek,
    },
  });

  const ArrayTranWeek = [];

  TransOrdersWeek.forEach((e) => {
    ArrayTranWeek.push(e.total);
  });

  const sumOfTransWeek = ArrayTranWeek.reduce(
    (a, b) => a + b,
    0
  ).toLocaleString();

  res.status(200).json({
    status: 'success',
    data: {
      sumOfTransWeek,
    },
  });
});
exports.TransThisMonth = catchAsync(async (req, res, next) => {
  const businessUser = await BusinessUser.findById(req.businessUser.id);
  const businessAccount = await BusinessAccount.findById(
    businessUser.businessAccount
  );

  const TransOrdersMonth = await Order.find({
    _id: businessAccount.orders,
    status: ['Paid', 'Shipped', 'Delivered', 'Completed', 'Canceled'],
    paidAt: {
      $gte: startMonth,
      $lte: endMonth,
    },
  });

  const ArrayTranMonth = [];

  TransOrdersMonth.forEach((e) => {
    ArrayTranMonth.push(e.total);
  });

  const sumOfTransMonth = ArrayTranMonth.reduce(
    (a, b) => a + b,
    0
  ).toLocaleString();

  res.status(200).json({
    status: 'success',
    data: {
      sumOfTransMonth,
    },
  });
});
exports.TransLifeTime = catchAsync(async (req, res, next) => {
  const businessUser = await BusinessUser.findById(req.businessUser.id);
  const businessAccount = await BusinessAccount.findById(
    businessUser.businessAccount
  );

  const TransOrdersLifeTime = await Order.find({
    _id: businessAccount.orders,
    status: ['Paid', 'Shipped', 'Delivered', 'Completed', 'Canceled'],
  });

  const ArrayTranLifeTime = [];

  TransOrdersLifeTime.forEach((e) => {
    ArrayTranLifeTime.push(e.total);
  });

  const sumOfTransLifeTime = ArrayTranLifeTime.reduce(
    (a, b) => a + b,
    0
  ).toLocaleString();

  res.status(200).json({
    status: 'success',
    data: {
      sumOfTransLifeTime,
    },
  });
});
