const express = require('express');
const viewController = require('../controllers/viewsController');
const authBusinessController = require('../controllers/authBusinessController');

const router = express.Router();

// Business Routes

router.get('/', viewController.busHomepage);

router.get('/login', viewController.busLogin);

router.get('/password', viewController.busForgotPass);

router.get('/resetpassword/:token', viewController.busResetPassword);

router.get('/signup', viewController.busSignup);

router.get(
  '/createproduct',
  authBusinessController.protectBusiness,
  viewController.createProduct
);

router.get(
  '/dashboard',
  authBusinessController.protectBusiness,
  viewController.getBusDashboard
);
router.get(
  '/products',
  authBusinessController.protectBusiness,
  viewController.allProducts
);
router.get(
  '/orders',
  authBusinessController.protectBusiness,
  viewController.allBusOrders
);

router.get(
  '/mobileorders',
  authBusinessController.protectBusiness,
  viewController.mobileOrdersPage
);

router.get(
  '/myorder/:productId/:orderId',
  authBusinessController.protectBusiness,
  authBusinessController.restrictOrderView,
  viewController.getMyorder
);

router.get(
  '/myproduct/:slug/:productId',
  authBusinessController.protectBusiness,
  authBusinessController.restrictProductView,
  viewController.getMyProduct
);
router.get(
  '/:slug/entries/:productId',
  authBusinessController.protectBusiness,
  authBusinessController.restrictProductView,
  viewController.getProductOrders
);

router.get(
  '/settings',
  authBusinessController.protectBusiness,
  viewController.busSettings
);

router.get(
  '/edit/:slug/:productId',
  authBusinessController.protectBusiness,
  authBusinessController.restrictProductView,
  viewController.editProduct
);

router.get('/purchasepixel/:businessAccountId', viewController.purchasePixel);
router.get('/productpixel/:productId', viewController.productPixel);

router.get('/verify-email/:emailtoken', authBusinessController.verifyEmail);

module.exports = router;
