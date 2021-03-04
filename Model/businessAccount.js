const mongoose = require('mongoose');
const validator = require('validator');

const businessAccountSchema = new mongoose.Schema({
  businessName: {
    type: String,
    required: [true, 'Please tell us your Business name'],
  },
  businessPhoneNumber: {
    type: String,
    required: [true, 'please provide your Phone Number'],
    unique: [
      true,
      'Your Business phone number has been used. Try and Login with your phone number',
    ],
    minlenght: [11, 'Your Business Phone Nmber should be up to 11'],
    maxlenght: [11, 'Your Business Phone Nmber should not be more than 11'],
  },
  businessAccountEmail: {
    type: String,
    required: [true, 'Please provide your email'],
    unique: [
      true,
      'It seems you have an account with this Email. Kindly use another email or login with your email',
    ],
    lowercase: true,
    validate: [validator.isEmail, 'Please provide a valid email'],
  },
  bankName: String,
  bankCode: String,
  bankAccountName: String,
  accountNumber: String,
  facebookPixelId: String,
  facebookCurrency: {
    type: String,
    default: 'USD',
  },
  facebookValue: String,
});
businessAccountSchema.set('toObject', { virtuals: true });
businessAccountSchema.set('toJSON', { virtuals: true });

businessAccountSchema.index(
  { businessAccountEmail: 1, businessPhoneNumber: 1 },
  { unique: true }
);

businessAccountSchema
  .path('businessAccountEmail')
  .validate(async (businessAccountEmail) => {
    const BusinessAccountEmail = await mongoose.models.BusinessAccount.countDocuments(
      {
        businessAccountEmail,
      }
    );
    return !BusinessAccountEmail;
  }, 'Email already exists');

businessAccountSchema
  .path('businessPhoneNumber')
  .validate(async (businessPhoneNumber) => {
    const BusinessPhoneNumber = await mongoose.models.BusinessAccount.countDocuments(
      {
        businessPhoneNumber,
      }
    );
    return !BusinessPhoneNumber;
  }, 'Phone Number already exists');

businessAccountSchema.virtual('businessUsers', {
  ref: 'BusinessUser',
  foreignField: 'businessAccount',
  localField: '_id',
});

businessAccountSchema.virtual('products', {
  ref: 'Product',
  foreignField: 'businessAccount',
  localField: '_id',
});

businessAccountSchema.virtual('orders', {
  ref: 'Order',
  foreignField: 'businessAccount',
  localField: '_id',
});

businessAccountSchema.virtual('product', {
  ref: 'Product',
  foreignField: 'orders',
  localField: '_id',
});
// businessAccountSchema.pre(/^find/, function (next) {
//   this.populate({
//     path: 'businessUsers',
//     select: '',
//   });

//   next();
// });

businessAccountSchema.pre(/^find/, function (next) {
  this.populate('businessUsers');
  this.populate('products');
  this.populate('orders');
  next();
});

const BusinessAccount = mongoose.model(
  'BusinessAccount',
  businessAccountSchema
);

module.exports = BusinessAccount;
