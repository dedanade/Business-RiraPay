const express = require('express');
const productController = require('../controllers/productController');
const authBusinessController = require('../controllers/authBusinessController');

const router = express.Router({ mergeParams: true });

// router.param('id', tourController.checkID);

router
  .route('/')
  .get(productController.getAllProducts)

  .post(
    authBusinessController.protectBusiness,
    productController.createNewProduct
  );

router
  .route('/:id')
  .get(productController.getProduct)
  .patch(
    authBusinessController.protectBusiness,
    productController.updateProduct
  )
  .delete(
    productController.deleteProduct,
    authBusinessController.protectBusiness
  );
router
  .route('/clone/:id')
  .get(
    authBusinessController.protectBusiness,
    productController.cloneNewProduct
  );
module.exports = router;
