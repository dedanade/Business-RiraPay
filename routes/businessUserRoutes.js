const express = require('express');
const BusinessuserController = require('../controllers/businessUserController');
const authBusinessController = require('../controllers/authBusinessController');
const productRouter = require('./productRoutes');

const router = express.Router();

// router.param('id', tourController.checkID);

router.use('/:businessUserId/products', productRouter);

router.post('/signup', authBusinessController.businesssignup);
router.post(
  '/addnew',
  authBusinessController.protectBusiness,
  authBusinessController.restrictTo('Business Owner', 'Admin'),
  authBusinessController.addNewBusinessUser
);

router.post('/login', authBusinessController.businesslogin);

router.get('/logout', authBusinessController.logout);
router.delete(
  '/delete/:businessUserId',
  authBusinessController.protectBusiness,
  authBusinessController.restrictTo('Business Owner', 'Admin'),
  BusinessuserController.deleteBusinessUser
);

router.post('/forgotPassword', authBusinessController.forgotBusinessPassword);
router.post(
  '/resetPassword/:token',
  authBusinessController.resetBusinessPassword
);

router.get(
  '/businessdashboard',
  authBusinessController.protectBusiness,
  BusinessuserController.getMe,
  BusinessuserController.getBusinessUser
);
router.get(
  '/sendverifyemail/:businessUserId',
  authBusinessController.sendNewVerifyEmail
);

router.get(
  '/me',
  authBusinessController.protectBusiness,
  BusinessuserController.getMe,
  BusinessuserController.getBusinessUser
);
router.patch(
  '/updateMyPassword',
  authBusinessController.protectBusiness,
  authBusinessController.updateBusinessPassword
);
router.patch(
  '/updatebank',
  authBusinessController.protectBusiness,
  authBusinessController.restrictTo('Business Owner'),
  BusinessuserController.updateBusBankAccount
);
router.patch(
  '/updateMyBusiness',
  authBusinessController.protectBusiness,
  BusinessuserController.updateMyBusiness
);

router.patch(
  '/updateMyPixel',
  authBusinessController.protectBusiness,
  BusinessuserController.updateMyPixel
);

router
  .route('/')
  .get(BusinessuserController.getAllBusinessUsers)
  .post(BusinessuserController.createBusinessUser);

router
  .route('/:id')
  .get(BusinessuserController.getBusinessUser)
  .patch(BusinessuserController.updateBusinessUser)
  .delete(BusinessuserController.deleteBusinessUser);

router.route('/account').get(BusinessuserController.getAllBusinessAccount);

router.route('/account/:id').get(BusinessuserController.getBusinessAccount);

module.exports = router;
