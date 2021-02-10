const moment = require('moment');
// const newEscape = require('escape-html');
const Product = require('../Model/productModel');
const BusinessUser = require('../Model/businessUserModel');
const BusinessAccount = require('../Model/businessAccount');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const Cart = require('../Model/cart');
const Order = require('../Model/orderModel');

exports.getBusDashboard = catchAsync(async (req, res, next) => {
  const businessUser = await BusinessUser.findById({
    _id: req.businessUser.id,
  });

  const businessAccount = await BusinessAccount.findOne(
    businessUser.businessAccount
  ).populate('orders');

  const product = await Product.find();

  const orders = await Order.find();

  const cart = await Cart.find();
  // Date Calculation

  //Today
  const startToday = moment().startOf('day').toDate(); // set to 12:00 am today
  const endToday = moment().endOf('day').toDate(); // set to 23:59 pm today

  // Sales Today Calculation
  const salesorders = await Order.find({
    _id: businessAccount.orders,
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

  // Transactions Today

  const transactionToday = await Order.find({
    _id: businessAccount.orders,
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

  res.status(200).render('busDashBoard', {
    title: 'Business DashBoard',
    product,
    orders,
    cart,
    businessUser,
    businessAccount,
    salesToday: sumOfCartSalesToday,
    transToday: sumOfcartTranToday,
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
  const businessUser = await BusinessUser.findById({
    _id: req.businessUser.id,
  });
  const businessAccount = await BusinessAccount.findById({
    _id: businessUser.businessAccount,
  });
  res.status(200).render('createProduct', {
    title: 'Create a new Product',
    businessAccount,
  });
});

exports.allProducts = catchAsync(async (req, res, next) => {
  const businessUser = await BusinessUser.findById({
    _id: req.businessUser.id,
  });
  const businessAccount = await BusinessAccount.findById({
    _id: businessUser.businessAccount,
  }).populate('orders');
  res.status(200).render('allProducts', {
    title: 'All Products',
    businessAccount,
  });
});

exports.allBusOrders = catchAsync(async (req, res, next) => {
  const businessUser = await BusinessUser.findById({
    _id: req.businessUser.id,
  });
  const businessAccount = await BusinessAccount.findById({
    _id: businessUser.businessAccount,
  }).populate('orders');

  res.status(200).render('allbusorders', {
    title: 'All Orders',
    businessAccount,
  });
});

exports.busSettings = catchAsync(async (req, res, next) => {
  const businessUser = await BusinessUser.findById({
    _id: req.businessUser.id,
  });

  const businessAccount = await BusinessAccount.findOne(
    businessUser.businessAccount
  );
  res.status(200).render('busSettings', {
    title: `Settings| ${businessUser.businessName}`,
    businessAccount,
  });
});

exports.getMyProduct = catchAsync(async (req, res, next) => {
  const product = await Product.findOne({
    _id: req.params.productId,
  });
  const businessUser = await BusinessUser.findOne({
    _id: req.businessUser.id,
  });

  const businessAccount = await BusinessAccount.findById({
    _id: businessUser.businessAccount,
  });

  const protocol = `${req.protocol}://${req.get('host')}`;

  if (!product || !businessUser) {
    return next(
      new AppError('There is no product with that name and ID.', 404)
    );
  }

  res.status(200).render('getMyProduct', {
    title: `${product.productName}`,
    product,
    businessAccount,
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
  });

  const businessAccount = await BusinessAccount.findById({
    _id: businessUser.businessAccount,
  }).populate('orders');

  const order = await Order.findOne({ _id: req.params.orderId });
  const cart = await Cart.findById(order.cart);

  if (!product || !order) {
    return next(new AppError('There is no order with that name and ID.', 404));
  }

  res.status(200).render('busOrderPage', {
    title: `OrderPage | ${businessAccount.businessName}`,
    product,
    businessUser,
    order,
    cart,
  });
});

exports.purchasePixel = catchAsync(async (req, res, next) => {
  const businessAccount = await BusinessAccount.findById({
    _id: req.params.businessAccountId,
  });

  res.status(200).render('purchasePixel', {
    title: 'Check purchase Pixel',
    businessAccount,
  });
});

exports.mobileOrdersPage = catchAsync(async (req, res, next) => {
  const businessUser = await BusinessUser.findById({
    _id: req.businessUser.id,
  });
  const businessAccount = await BusinessAccount.findById({
    _id: businessUser.businessAccount,
  }).populate('orders');

  res.status(200).render('mobileOrders', {
    title: 'Check purchase Pixel',
    businessAccount,
  });
});
