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
  '/allproducts',
  authBusinessController.protectBusiness,
  viewController.allProducts
);
router.get(
  '/allorders',
  authBusinessController.protectBusiness,
  viewController.allBusOrders
);

router.get(
  '/myorder/:productId/:orderId',
  authBusinessController.protectBusiness,
  viewController.getMyorder
);

router.get(
  '/myproduct/:slug/:productId',
  authBusinessController.protectBusiness,
  viewController.getMyProduct
);

router.get(
  '/settings',
  authBusinessController.protectBusiness,
  viewController.busSettings
);

router.get(
  '/edit/:slug/:productId',
  authBusinessController.protectBusiness,
  viewController.editProduct
);

router.get('/purchasepixel/:businessUserId', viewController.purchasePixel);

router.route('/mobileorders/:businessUserId').get(viewController.OrdersPage);

module.exports = router;
