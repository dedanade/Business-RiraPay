const Product = require('../Model/productModel');
const BusinessUser = require('../Model/businessUserModel');
const catchAsync = require('../utils/catchAsync');
const factory = require('./handlerFactory');

exports.createNewProduct = catchAsync(async (req, res, next) => {
  const businessUser = await BusinessUser.findById({
    _id: req.businessUser.id,
  });
  const businessAccountID = businessUser.businessAccount;

  if (!req.body.businessAccount) req.body.businessAccount = businessAccountID;

  const newProduct = await Product.create(req.body);

  res.status(201).json({
    status: 'success',
    data: { newProduct },
  });
});

// exports.createCart = catchAsync(async (req, res, next) => {
//   const newCart = await Cart.create(req.body);

//   res.status(201).json({
//     status: 'success',
//     data: {
//       newCart
//     }
//   });
// });

exports.getAllProducts = factory.getAll(Product);
exports.getProduct = factory.getOne(Product);
exports.updateProduct = factory.updateOne(Product);
exports.deleteProduct = factory.deleteOne(Product);
