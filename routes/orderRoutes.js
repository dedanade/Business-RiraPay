const express = require('express');
const orderController = require('../controllers/orderController');
const authBusinessController = require('../controllers/authBusinessController');

const router = express.Router();

router.route('/').get(orderController.getAllOrders);
router.route('/deliver/:OrderId').get(orderController.updateDelivery);
router
  .route('/cancel/:orderId')
  .get(authBusinessController.protectBusiness, orderController.updateCancel);

router.route('/ship').patch(orderController.updateShiping);

router.route('/:OrderId').patch(orderController.updateOrder);

// // FETCH Weekly, LIFETIME AND MONTHLY SALES

//Sales!

router
  .route('/salestoday')
  .get(authBusinessController.protectBusiness, orderController.salesToday);
router
  .route('/salesweek')
  .get(authBusinessController.protectBusiness, orderController.salesThisWeek);
router
  .route('/salesmonth')
  .get(authBusinessController.protectBusiness, orderController.salesThisMonth);
router
  .route('/saleslifetime')
  .get(authBusinessController.protectBusiness, orderController.salesLifeTime);

//Transaction
router
  .route('/transtoday')
  .get(authBusinessController.protectBusiness, orderController.TransToday);
router
  .route('/transweek')
  .get(authBusinessController.protectBusiness, orderController.TransThisWeek);
router
  .route('/transmonth')
  .get(authBusinessController.protectBusiness, orderController.TransThisMonth);
router
  .route('/translifetime')
  .get(authBusinessController.protectBusiness, orderController.TransLifeTime);

module.exports = router;
