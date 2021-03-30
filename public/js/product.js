/* eslint-disable */
import { createProduct } from './create';
import { updateProduct } from './update';
import { loadingBtnSpinner } from './index';

export const createProductInput = (e, submitButton) => {
  e.preventDefault();
  const productName = document.getElementById('productName').value;
  const price = document.getElementById('productPrice').value || 0;
  const stock = document.getElementById('productStock').value;
  const additionalInfo = document.getElementById('additionalInfo').value;
  const delInfo = document.getElementById('product-del-Info').value;
  const discount = document.getElementById('inputDiscount').value;
  const colours = document.getElementById('color-tags').value;
  const sizes = document.getElementById('size-tags').value;
  const submitBtnTextColor = document.getElementById('submitBtnTextColor')
    .value;
  const submitBtnBGColor = document.getElementById('submitBtnBGColor').value;
  const submitBtnTextInput = document.getElementById('submitbBtnTextInput')
    .value;
  const promoPriceForm = document
    .getElementById('promoPriceForm')
    .querySelectorAll('.QPInputcl');
  var newarray = [];
  promoPriceForm.forEach((e) => {
    const inputtext = e.querySelector('input[type="text"]').value;
    const inputnumber = e.querySelector('input[type="number"]').value;
    const array = `${inputtext} = ₦${inputnumber}`;
    newarray.push(array);
  });
  const promoPriceQty = newarray.toString();

  const facebookPixelId = document.getElementById('product-pixel-id').value;
  const facebookPixelEvent = document.getElementById('product-pixel-conversion')
    .value;
  const facebookCurrency = document.getElementById('product-pixel-currency')
    .value;
  const facebookValue = document.getElementById('product-pixel-value').value;

  if (price > 0 && promoPriceQty.split(',')[0] != ' = ₦') {
    alert(`You can't use one Price and Varient at the same time`);
    return false;
  } else if (price === 0 && promoPriceQty.split(',')[0] === ' = ₦') {
    alert(`Kindly use one of the pricing type. The two options can't be empty`);
    return false;
  } else loadingBtnSpinner(submitButton);
  createProduct(
    productName,
    price,
    stock,
    additionalInfo,
    delInfo,
    discount,
    colours,
    sizes,
    promoPriceQty,
    facebookPixelId,
    facebookCurrency,
    facebookValue,
    facebookPixelEvent,
    submitBtnTextInput,
    submitBtnBGColor,
    submitBtnTextColor,
    submitButton
  );
};

export const editProductInput = (e, submitButton) => {
  e.preventDefault();
  const productName = document.getElementById('editproductName').value;
  const editprice = document.getElementById('editProductPrice').value || 0;
  const stock = document.getElementById('editproductStock').value;
  const additionalInfo = document.getElementById('editadditionalInfo').value;
  const delInfo = document.getElementById('edit-product-del-Info').value;
  const discount = document.getElementById('editInputDiscount').value;
  const colours = document.getElementById('edit-color-tags').value;
  const sizes = document.getElementById('edit-size-tags').value;
  const productId = document.getElementById('editProductId').value;

  const submitBtnTextColor = document.getElementById('submitBtnTextColor')
    .value;
  const submitBtnBGColor = document.getElementById('submitBtnBGColor').value;
  const submitBtnTextInput = document.getElementById('submitbBtnTextInput')
    .value;
  const promoPriceForm = document
    .getElementById('promoPriceForm')
    .querySelectorAll('.QPInputcl');
  var newarray = [];
  promoPriceForm.forEach((e) => {
    const inputtext = e.querySelector('input[type="text"]').value;
    const inputnumber = e.querySelector('input[type="number"]').value;
    const array = `${inputtext} = ₦${inputnumber}`;
    newarray.push(array);
  });
  const promoPriceQty = newarray.toString();

  const facebookPixelId = document.getElementById('edit-product-pixel-id')
    .value;
  const facebookPixelEvent = document.getElementById(
    'edit-product-pixel-conversion'
  ).value;

  const facebookCurrency = document.getElementById(
    'edit-product-pixel-currency'
  ).value;
  const facebookValue = document.getElementById('edit-product-pixel-value')
    .value;
  if (editprice > 0 && promoPriceQty.split(',')[0] != ' = ₦') {
    alert(`You can't use one Price and Varient at the same time`);
    return false;
  } else if (editprice === 0 && promoPriceQty.split(',')[0] === ' = ₦') {
    alert(`Kindly use one of the pricing type. The two options can't be empty`);
    return false;
  } else loadingBtnSpinner(submitButton);
  updateProduct(
    productName,
    editprice,
    stock,
    additionalInfo,
    delInfo,
    discount,
    colours,
    sizes,
    promoPriceQty,
    facebookPixelId,
    facebookCurrency,
    facebookValue,
    facebookPixelEvent,
    submitBtnTextInput,
    submitBtnBGColor,
    submitBtnTextColor,
    productId,
    submitButton
  );
};
