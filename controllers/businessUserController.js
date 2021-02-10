// const path = require('path');
const BusinessUser = require('../Model/businessUserModel');
const BusinessAccount = require('../Model/businessAccount');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const factory = require('./handlerFactory');

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

exports.updateMyBusiness = catchAsync(async (req, res, next) => {
  // 1) Create error if user POSTs password data
  if (req.body.businessPassword) {
    return next(
      new AppError(
        'This route is not for password updates. Please use /updateMyPassword.',
        400
      )
    );
  }

  // 2) Filtered out fields names that are allowed to be updated
  const filteredBody = filterObj(
    req.body,
    'businessPhoneNumber',
    'businessName',
    'businessEmail'
  );

  // 3) Update user document

  // Validator not working!!!

  const updatedBusinessUser = await BusinessUser.findByIdAndUpdate(
    req.businessUser.id,
    filteredBody,
    {
      new: true,
      runValidators: true,
      context: 'query',
    }
  );

  res.status(200).json({
    status: 'success',
    data: {
      businessUser: updatedBusinessUser,
    },
  });
});

exports.updateBusBankAccount = catchAsync(async (req, res, next) => {
  // 2) Filtered out fields names that are allowed to be updated
  const filteredBody = filterObj(
    req.body,
    'bankName',
    'accountNumber',
    'bankCode',
    'bankAccountName'
  );

  const businessUser = await BusinessUser.findById({
    _id: req.businessUser.id,
  });
  // Validator not working!!!

  const updatedBusinessUser = await BusinessAccount.findByIdAndUpdate(
    businessUser.businessAccount,
    filteredBody,
    {
      new: true,
      runValidators: true,
      context: 'query',
    }
  );

  res.status(200).json({
    status: 'success',
    data: {
      updatedBusinessUser,
    },
  });
});

exports.updateMyPixel = catchAsync(async (req, res, next) => {
  // Filtered out fields names that are allowed to be updated
  const filteredBody = filterObj(
    req.body,
    'facebookPixelId',
    'facebookCurrency',
    'facebookValue'
  );

  const businessUser = await BusinessUser.findById({
    _id: req.businessUser.id,
  });

  const updatedBusinessAccount = await BusinessAccount.findByIdAndUpdate(
    { _id: businessUser.businessAccount },
    filteredBody,
    {
      new: true,
      runValidators: true,
      context: 'query',
    }
  );
  res.status(200).json({
    status: 'success',
    data: {
      updatedBusinessAccount,
    },
  });
});

exports.deleteBusinessUser = catchAsync(async (req, res, next) => {
  const businessUser = await BusinessUser.findById({
    _id: req.params.businessUserId,
  });

  if (businessUser.role === 'Business Owner') {
    return next(new AppError(`You can't delete the business Owner`, 400));
  }
  await BusinessUser.deleteOne({
    _id: businessUser.id,
  });

  res.status(200).json({
    status: 'success',
    data: 'Succesfully Deleted',
  });
});

exports.createBusinessUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined!',
  });
};

exports.getMe = (req, res, next) => {
  req.params.id = req.businessUser.id;
  next();
};

exports.getBusinessUser = factory.getOne(BusinessUser);
exports.getAllBusinessUsers = factory.getAll(BusinessUser);
exports.updateBusinessUser = factory.updateOne(BusinessUser);
// exports.deleteBusinessUser = factory.deleteOne(BusinessUser);

exports.getAllBusinessAccount = factory.getAll(BusinessAccount);
exports.getBusinessAccount = factory.getOne(BusinessAccount, 'orders');

//Paystack Account Lookup
// exports.paystack = catchAsync(async (req, res, next) => {
//   const options = {
//     hostname: 'api.paystack.co',
//     port: 443,
//     path: '/bank/resolve?account_number=0001234567&bank_code=058',
//     method: 'GET',
//     headers: {
//       Authorization: 'Bearer SECRET_KEY',
//     },
//   };
//   https
//     .request(options, (resp) => {
//       let data = '';
//       resp.on('data', (chunk) => {
//         data += chunk;
//       });
//       resp.on('end', () => {
//         console.log(JSON.parse(data));
//       });
//     })
//     .on('error', (error) => {
//       console.error(error);
//     });
// });
