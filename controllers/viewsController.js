const moment = require('moment');
// const newEscape = require('escape-html');
const Product = require('../Model/productModel');
const BusinessUser = require('../Model/businessUserModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const Cart = require('../Model/cart');
const Order = require('../Model/orderModel');

exports.getBusDashboard = catchAsync(async (req, res, next) => {
  const businessUser = await BusinessUser.findById({
    _id: req.businessUser.id,
  }).populate('orders');
  const product = await Product.find();

  const orders = await Order.find();

  const cart = await Cart.find();
  // Date Calculation

  //Today
  const startToday = moment().startOf('day').toDate(); // set to 12:00 am today
  const endToday = moment().endOf('day').toDate(); // set to 23:59 pm today

  // This Week
  const startWeek = moment().startOf('isoWeek').toDate(); // set to 12:00am of Monday according to ISO 8601
  const endWeek = moment().endOf('isoWeek').toDate(); // set to 23:59 pm of Sunday

  // This Month
  const startMonth = moment().startOf('month').toDate(); // set to 12:00 for the first day of th month
  const endMonth = moment().endOf('month').toDate(); // set to 23:59 pm of the last day of the week

  // Sales Today Calculation
  const salesorders = await Order.find({
    _id: businessUser.orders,
    createdAt: {
      $gte: startToday,
      $lte: endToday,
    },
  });
  const arraySalesOrder = [];

  salesorders.forEach((e) => {
    arraySalesOrder.push(e.total);
  });

  const sumOfCartSalesToday = arraySalesOrder
    .reduce((a, b) => a + b, 0)
    .toLocaleString();

  // Sales This week

  const salesOrdersWeek = await Order.find({
    _id: businessUser.orders,
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

  //Sales This Month

  const salesOrdersMonth = await Order.find({
    _id: businessUser.orders,
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

  // Sales Lifetime

  const salesOrdersLifetime = await Order.find({
    _id: businessUser.orders,
  });

  const arraySalesLifetime = [];

  salesOrdersLifetime.forEach((e) => {
    arraySalesLifetime.push(e.total);
  });

  const sumOfCartSalesLifetime = arraySalesLifetime
    .reduce((a, b) => a + b, 0)
    .toLocaleString();

  // Transactions Today

  const transactionToday = await Order.find({
    _id: businessUser.orders,
    status: ['Paid', 'Shipped', 'Delivered', 'Completed', 'Canceled'],
    paidAt: {
      $gte: startToday,
      $lte: endToday,
    },
  });

  const ArrayTranToday = [];

  transactionToday.forEach((e) => {
    ArrayTranToday.push(e.total);
  });

  const sumOfcartTranToday = ArrayTranToday.reduce(
    (a, b) => a + b,
    0
  ).toLocaleString();

  // Transactions This Week

  const transactionWeek = await Order.find({
    _id: businessUser.orders,
    status: ['Paid', 'Shipped', 'Delivered', 'Completed', 'Canceled'],
    paidAt: {
      $gte: startWeek,
      $lte: endWeek,
    },
  });

  const ArrayTranWeek = [];

  transactionWeek.forEach((e) => {
    ArrayTranWeek.push(e.total);
  });

  const sumOfcartTranWeek = ArrayTranWeek.reduce(
    (a, b) => a + b,
    0
  ).toLocaleString();

  // Transactions This Month
  const transactionMonth = await Order.find({
    _id: businessUser.orders,
    status: ['Paid', 'Shipped', 'Delivered', 'Completed', 'Canceled'],
    paidAt: {
      $gte: startMonth,
      $lte: endMonth,
    },
  });

  const ArrayTranMonth = [];

  transactionMonth.forEach((e) => {
    ArrayTranMonth.push(e.total);
  });

  const sumOfcartTranMonth = ArrayTranMonth.reduce(
    (a, b) => a + b,
    0
  ).toLocaleString();

  //SalesLifetime
  const transactionLifetime = await Order.find({
    _id: businessUser.orders,
    status: ['Paid', 'Shipped', 'Delivered', 'Completed', 'Canceled'],
  });

  const ArrayTranLifetime = [];

  transactionLifetime.forEach((e) => {
    ArrayTranLifetime.push(e.total);
  });

  const sumOfcartTranLifetime = ArrayTranLifetime.reduce(
    (a, b) => a + b,
    0
  ).toLocaleString();

  res.status(200).render('busDashBoard', {
    title: 'Business DashBoard',
    product,
    orders,
    cart,
    businessUser,
    salesToday: sumOfCartSalesToday,
    salesWeek: sumOfCartSalesWeek,
    salesMonth: sumOfCartSalesMonth,
    salesLifetime: sumOfCartSalesLifetime,
    transToday: sumOfcartTranToday,
    transWeek: sumOfcartTranWeek,
    transMonth: sumOfcartTranMonth,
    transLifetime: sumOfcartTranLifetime,
  });
});

exports.busHomepage = catchAsync(async (req, res, next) => {
  res.status(200).render('homepage/bushomepage', {
    title: 'Homepage',
  });
});

exports.busForgotPass = catchAsync(async (req, res, next) => {
  res.status(200).render('busForgotPass', {
    title: 'Retrieve your Password',
  });
});

exports.busResetPassword = catchAsync(async (req, res, next) => {
  const { token } = req.params;
  res.status(200).render('busResetPass', {
    title: 'New Password',
    token,
  });
});

exports.busLogin = catchAsync(async (req, res, next) => {
  res.status(200).render('busLogin', {
    title: 'Login Business Account',
  });
});

exports.busSignup = catchAsync(async (req, res, next) => {
  res.status(200).render('busSignup', {
    title: 'Sign Up',
  });
});

exports.createProduct = catchAsync(async (req, res, next) => {
  res.status(200).render('createProduct', {
    title: 'Create a new Product',
  });
});

exports.allProducts = catchAsync(async (req, res, next) => {
  res.status(200).render('allProducts', {
    title: 'All Products',
  });
});

exports.allBusOrders = catchAsync(async (req, res, next) => {
  const businessUser = await BusinessUser.findById({
    _id: req.businessUser.id,
  }).populate('orders');
  res.status(200).render('allbusorders', {
    title: 'All Orders',
    businessUser,
  });
});

exports.busSettings = catchAsync(async (req, res, next) => {
  const businessUser = await BusinessUser.findById({
    _id: req.businessUser.id,
  });
  res.status(200).render('busSettings', {
    title: `Settings| ${businessUser.businessName}`,
    businessUser,
  });
});

exports.getMyProduct = catchAsync(async (req, res, next) => {
  const product = await Product.findOne({
    _id: req.params.productId,
  });
  const businessUser = await BusinessUser.findOne({
    _id: req.businessUser.id,
  }).populate('orders');

  const protocol = `${req.protocol}://${req.get('host')}`;

  if (!product || !businessUser) {
    return next(
      new AppError('There is no product with that name and ID.', 404)
    );
  }

  res.status(200).render('getMyProduct', {
    title: `${product.productName}`,
    product,
    businessUser,
    protocol,
  });
});

exports.editProduct = catchAsync(async (req, res, next) => {
  const product = await Product.findOne({
    _id: req.params.productId,
  });

  if (!product) {
    return next(
      new AppError('There is no product with that name and ID.', 404)
    );
  }

  // const newEdit = product.additionalInfo.html();

  res.status(200).render('editProduct', {
    title: `${product.productName}`,
    product,
  });
});

exports.getMyorder = catchAsync(async (req, res, next) => {
  const product = await Product.findOne({
    _id: req.params.productId,
  });
  const businessUser = await BusinessUser.findOne({
    _id: req.businessUser.id,
  }).populate('orders');

  const order = await Order.findOne({ _id: req.params.orderId });
  const cart = await Cart.findById(order.cart);

  if (!product || !order) {
    return next(new AppError('There is no order with that name and ID.', 404));
  }

  res.status(200).render('busOrderPage', {
    title: `OrderPage | ${businessUser.businessName}`,
    product,
    businessUser,
    order,
    cart,
  });
});

exports.purchasePixel = catchAsync(async (req, res, next) => {
  const businessUser = await BusinessUser.findById({
    _id: req.params.businessUserId,
  });

  res.status(200).render('purchasePixel', {
    title: 'Check purchase Pixel',
    businessUser,
  });
});

exports.OrdersPage = catchAsync(async (req, res, next) => {
  const businessUser = await BusinessUser.findById({
    _id: req.params.businessUserId,
  }).populate('orders');
  const product = await Product.find();

  const orders = await Order.find();

  res.status(200).render('mobileOrders', {
    title: 'Check purchase Pixel',
    businessUser,
    product,
    orders,
  });
});
