/* eslint-disable no-redeclare */
/* eslint-disable block-scoped-var */
/* eslint-disable no-var */
/* eslint-disable vars-on-top */
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

exports.updateOnlineDelivery = catchAsync(async (req, res, next) => {
  const order = await Order.findById(req.params.orderId);

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
exports.updateHideOrder = catchAsync(async (req, res, next) => {
  const order = await Order.findById(req.params.orderId);

  order.active = false;
  await order.save();

  res.status(200).json({
    status: 'success',
    data: {
      order,
    },
  });
});
exports.updateRestoreOrder = catchAsync(async (req, res, next) => {
  const order = await Order.findById(req.params.orderId);

  order.active = true;
  await order.save();

  res.status(200).json({
    status: 'success',
    data: {
      order,
    },
  });
});

exports.updateOrderStatus = catchAsync(async (req, res, next) => {
  const filteredBody = filterObj(req.body, 'status');

  // 3) Update user document
  // Validator not working!!!
  const UpdatedSchorder = await Order.findByIdAndUpdate(
    req.params.orderId,
    filteredBody,
    {
      new: true,
      upsert: true,
      runValidators: true,
    }
  );

  res.status(200).json({
    status: 'success',
    data: {
      UpdatedSchorder,
    },
  });
});
exports.updateSchedule = catchAsync(async (req, res, next) => {
  const filteredBody = filterObj(req.body, 'scheduledAt');

  // 3) Update user document
  // Validator not working!!!
  const UpdatedSchorder = await Order.findByIdAndUpdate(
    req.params.orderId,
    filteredBody,
    {
      new: true,
      upsert: true,
    }
  );
  UpdatedSchorder.status = 'Scheduled';
  await UpdatedSchorder.save();

  res.status(200).json({
    status: 'success',
    data: {
      UpdatedSchorder,
    },
  });
});

exports.getAllOrders = factory.getAll(Order);

// FETCH DAILY, LIFETIME AND MONTHLY SALES

// Sales

const salesToday = catchAsync(async (model, req, res) => {
  const salesOrdersToday = await Order.find({
    _id: model.orders,
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

const salesThisWeek = catchAsync(async (model, req, res) => {
  const salesOrdersWeek = await Order.find({
    _id: model.orders,
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
const salesThisMonth = catchAsync(async (model, req, res) => {
  const salesOrdersMonth = await Order.find({
    _id: model.orders,
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

const salesLifeTime = catchAsync(async (model, req, res) => {
  const salesOrdersLifeTime = await Order.find({
    _id: model.orders,
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

exports.modelForSearch = catchAsync(async (req, res, next) => {
  if (req.query.productId) {
    var model = await Product.findOne({
      _id: req.query.productId,
    }).populate('orders');
  } else {
    const businessUser = await BusinessUser.findById(req.businessUser.id);
    var model = await BusinessAccount.findById(businessUser.businessAccount);
  }
  res.locals.model = model;
  next();
});

exports.orderSalesToday = async (req, res) => {
  const { model } = res.locals;
  salesToday(model, req, res);
};
exports.orderSalesWeek = async (req, res) => {
  const { model } = res.locals;
  salesThisWeek(model, req, res);
};
exports.orderSalesMonth = async (req, res) => {
  const { model } = res.locals;
  salesThisMonth(model, req, res);
};
exports.orderSalesLifetime = async (req, res) => {
  const { model } = res.locals;
  salesLifeTime(model, req, res);
};

// TRANSACTION!!

const transToday = catchAsync(async (model, req, res) => {
  const transOrdersToday = await Order.find({
    _id: model.orders,
    status: ['Paid', 'Shipped', 'Delivered', 'Completed', 'Canceled'],
    paidAt: {
      $gte: startToday,
      $lte: endToday,
    },
  });

  const arrayTranToday = [];

  transOrdersToday.forEach((e) => {
    arrayTranToday.push(e.total);
  });

  const sumOfTransToday = arrayTranToday
    .reduce((a, b) => a + b, 0)
    .toLocaleString();

  res.status(200).json({
    status: 'success',
    data: {
      sumOfTransToday,
    },
  });
});
const transThisWeek = catchAsync(async (model, req, res) => {
  const transOrdersWeek = await Order.find({
    _id: model.orders,
    status: ['Paid', 'Shipped', 'Delivered', 'Completed', 'Canceled'],
    paidAt: {
      $gte: startWeek,
      $lte: endWeek,
    },
  });

  const arrayTranWeek = [];

  transOrdersWeek.forEach((e) => {
    arrayTranWeek.push(e.total);
  });

  const sumOfTransWeek = arrayTranWeek
    .reduce((a, b) => a + b, 0)
    .toLocaleString();

  res.status(200).json({
    status: 'success',
    data: {
      sumOfTransWeek,
    },
  });
});
const transThisMonth = catchAsync(async (model, req, res) => {
  const transOrdersMonth = await Order.find({
    _id: model.orders,
    status: ['Paid', 'Shipped', 'Delivered', 'Completed', 'Canceled'],
    paidAt: {
      $gte: startMonth,
      $lte: endMonth,
    },
  });

  const arrayTranMonth = [];

  transOrdersMonth.forEach((e) => {
    arrayTranMonth.push(e.total);
  });

  const sumOfTransMonth = arrayTranMonth
    .reduce((a, b) => a + b, 0)
    .toLocaleString();

  res.status(200).json({
    status: 'success',
    data: {
      sumOfTransMonth,
    },
  });
});
const transLifeTime = catchAsync(async (model, req, res) => {
  const transOrdersLifeTime = await Order.find({
    _id: model.orders,
    status: ['Paid', 'Shipped', 'Delivered', 'Completed', 'Canceled'],
  });

  const arrayTranLifeTime = [];

  transOrdersLifeTime.forEach((e) => {
    arrayTranLifeTime.push(e.total);
  });

  const sumOfTransLifeTime = arrayTranLifeTime
    .reduce((a, b) => a + b, 0)
    .toLocaleString();

  res.status(200).json({
    status: 'success',
    data: {
      sumOfTransLifeTime,
    },
  });
});

exports.orderTransToday = async (req, res) => {
  const { model } = res.locals;
  transToday(model, req, res);
};
exports.orderTransWeek = async (req, res) => {
  const { model } = res.locals;
  transThisWeek(model, req, res);
};
exports.orderTransMonth = async (req, res) => {
  const { model } = res.locals;
  transThisMonth(model, req, res);
};
exports.orderTransLifeTime = async (req, res) => {
  const { model } = res.locals;
  transLifeTime(model, req, res);
};
