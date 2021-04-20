const express = require('express');
const orderController = require('../controllers/orderController');
const authBusinessController = require('../controllers/authBusinessController');

const router = express.Router();
router
  .route('/status/:orderId')
  .patch(
    authBusinessController.protectBusiness,
    orderController.updateOrderStatus
  );
router.route('/ship').patch(orderController.updateShiping);
router.route('/:OrderId').patch(orderController.updateOrder);
router
  .route('/schedule/:orderId')
  .patch(
    authBusinessController.protectBusiness,
    orderController.updateSchedule
  );
router.route('/').get(orderController.getAllOrders);
router
  .route('/deliver/:orderId')
  .get(
    authBusinessController.protectBusiness,
    orderController.updateOnlineDelivery
  );
router
  .route('/hide/:orderId')
  .get(authBusinessController.protectBusiness, orderController.updateHideOrder);
router
  .route('/restore/:orderId')
  .get(
    authBusinessController.protectBusiness,
    orderController.updateRestoreOrder
  );

// // FETCH Weekly, LIFETIME AND MONTHLY SALES

//Sales!

router
  .route('/salestoday?:productId')
  .get(
    authBusinessController.protectBusiness,
    orderController.modelForSearch,
    orderController.orderSalesToday
  );
router
  .route('/salesweek?:productId')
  .get(
    authBusinessController.protectBusiness,
    orderController.modelForSearch,
    orderController.orderSalesWeek
  );
router
  .route('/salesmonth?:productId')
  .get(
    authBusinessController.protectBusiness,
    orderController.modelForSearch,
    orderController.orderSalesMonth
  );
router
  .route('/saleslifetime?:productId')
  .get(
    authBusinessController.protectBusiness,
    orderController.modelForSearch,
    orderController.orderSalesLifetime
  );

//Transaction
router
  .route('/transtoday?:productId')
  .get(
    authBusinessController.protectBusiness,
    orderController.modelForSearch,
    orderController.orderTransToday
  );
router
  .route('/transweek?:productId')
  .get(
    authBusinessController.protectBusiness,
    orderController.modelForSearch,
    orderController.orderTransWeek
  );
router
  .route('/transmonth?:productId')
  .get(
    authBusinessController.protectBusiness,
    orderController.modelForSearch,
    orderController.orderTransMonth
  );
router
  .route('/translifetime?:productId')
  .get(
    authBusinessController.protectBusiness,
    orderController.modelForSearch,
    orderController.orderTransLifeTime
  );
module.exports = router;
