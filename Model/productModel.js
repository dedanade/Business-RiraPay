const mongoose = require('mongoose');
const slugify = require('slugify');

const productSchema = new mongoose.Schema(
  {
    productName: {
      type: String,
      required: [true, 'Product Name is Required'],
      trim: true,
    },
    slug: String,
    stock: Number,
    additionalInfo: String,
    delInfo: String,
    price: {
      type: Number,
      default: 0,
    },
    codOption: {
      type: Boolean,
      default: true,
    },
    promoQtyPrice: [String],
    images: [String],
    colours: [String],
    sizes: [String],
    discount: {
      type: Number,
      default: 0,
    },
    facebookPixel: {
      FbId: {
        type: String,
        default: '0000',
      },
      currency: {
        type: String,
        default: 'USD',
      },
      value: {
        type: String,
        default: '00',
      },
      conversionEvent: {
        type: String,
        default: 'Purchase',
      },
    },
    formStyle: {
      submitBtnText: {
        type: String,
        default: 'Submit Order',
      },
      submitBtnBGColor: {
        type: String,
        default: '#01afee',
      },
      submitBtnColor: {
        type: String,
        default: '#ffffff',
      },
    },

    createdAt: {
      type: Date,
      default: Date.now(),
      select: false,
    },
    businessAccount: {
      type: mongoose.Schema.ObjectId,
      ref: 'BusinessAccount',
    },

    date: { type: Date, default: Date.now },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);
productSchema.virtual('orders', {
  ref: 'Order',
  foreignField: 'product',
  localField: '_id',
});

productSchema.pre('save', function (next) {
  this.slug = slugify(this.productName, { lower: true });
  next();
});

// productSchema.pre(/^find/, function(next) {
//   this.populate({
//     path: 'orders',
//     select: ''
//   });
//   next();
// });

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
