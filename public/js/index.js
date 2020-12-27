/*eslint-disable */

import '@babel/polyfill';
import { createProductInput, editProductInput } from './product';
import { busLogout } from './loginAPI';

import {
  updatePixel,
  updateTags,
  updateOrderEmails,
  updateShippingOrder,
  updateDelivery,
} from './update';
import { showAlert } from './alert';
import { busLoginInput, busSignupInput } from './signup_login';
import { busForgotPassInput, busResetPassInput } from './forgot_resetPass';

export const busToken = (document.getElementById('forgotBusPassToken') || {})
  .value;

export const orderId = (document.getElementById('orderid') || {}).value;

export const DelOrderId = (document.getElementById('DelOrderId') || {}).value;

export const productId = (document.getElementById('productId') || {}).value;

const busloginForm = document.querySelector('.bus-login-form');

const logoutBus = document.querySelector('.logout_bus_btn');

const busSignupForm = document.querySelector('.signup-bus-form');

const busForgotForm = document.querySelector('.bus-forgot-form');
const resetBusPassForm = document.querySelector('.reset-bus-pass-form');

const createProductForm = document.querySelector('.create-product-form');
const editProductForm = document.querySelector('.edit-product-form');

const business_pixel_Form = document.getElementById('business-pixel-form');
const tagsForm = document.getElementById('tagsform');
const updateForm = document.getElementById('updateorderform');
const updateFormmobile = document.getElementById('updateFormmobile');
const updateShipingForm = document.getElementById('shippingForm');
const updateDeliveryForm = document.getElementById('deliveryForm');

const selectColorOptions = document.querySelector('.selectColorOptions');
const selectSizeOptions = document.querySelector('.selectSizeOptions');
const selectPriceOptions = document.querySelector('.selectPriceOptions');

if (busloginForm) busloginForm.addEventListener('submit', busLoginInput);

if (logoutBus) logoutBus.addEventListener('click', busLogout);

if (busSignupForm) busSignupForm.addEventListener('submit', busSignupInput);

if (busForgotForm) busForgotForm.addEventListener('submit', busForgotPassInput);

if (resetBusPassForm)
  resetBusPassForm.addEventListener('submit', busResetPassInput);

if (createProductForm)
  createProductForm.addEventListener('submit', createProductInput);

if (editProductForm)
  editProductForm.addEventListener('submit', editProductInput);

if (business_pixel_Form)
  business_pixel_Form.addEventListener('submit', (e) => {
    e.preventDefault();
    const facebookPixelId = document.getElementById('bussiness-pixelId').value;
    const facebookPixelCurrency = document.getElementById(
      'bussiness-pixel-currency'
    ).value;
    const facebookPixelValue = document.getElementById('bussiness-pixel-value')
      .value;
    updatePixel(facebookPixelId, facebookPixelCurrency, facebookPixelValue);
  });

if (tagsForm)
  tagsForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const tags = document.getElementById('order-tags').value;
    updateTags(tags);
  });

if (updateForm)
  updateForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const orders = document.getElementById('ordersemail').value;
    updateOrderEmails(orders);
  });

if (updateFormmobile)
  updateFormmobile.addEventListener('submit', (e) => {
    e.preventDefault();
    const orders = document.getElementById('ordersemail').value;
    updateOrderEmails(orders);
  });

if (updateShipingForm)
  updateShipingForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const OrderId = document.getElementById('OrderId').value;
    const logisticName = document.getElementById('logName').value;
    const trackingNum = document.getElementById('logNum').value;
    updateShippingOrder(OrderId, logisticName, trackingNum);
  });

if (updateDeliveryForm)
  updateDeliveryForm.addEventListener('submit', (e) => {
    e.preventDefault();
    updateDelivery();
  });
if (selectPriceOptions) {
  const selectPromoPrice = document.getElementById('selectPromoPrice');
  const promoQtyPriceValue = document.getElementById('inputPromoQtyPrice')
    .value;

  // console.log(promoQtyPriceValue);
  const PromoQtyArray = promoQtyPriceValue.split(',');
  const newPromoQtyArray = PromoQtyArray.filter((e) => e !== ' 0 = 0 Naira');
  // console.log(PromoQtyArray);

  for (var i = 0; i < newPromoQtyArray.length; i++) {
    var opt = newPromoQtyArray[i];
    var el = document.createElement('option');
    el.textContent = opt;
    el.value = opt;
    selectPromoPrice.appendChild(el);
  }
}

if (selectColorOptions) {
  const selectColours = document.getElementById('selectColours');
  const coloursValue = document.getElementById('productColours').value;
  const coloursOptions = coloursValue.split(',');
  for (var i = 0; i < coloursOptions.length; i++) {
    var opt = coloursOptions[i];
    var el = document.createElement('option');
    el.textContent = opt;
    el.value = opt;
    selectColours.appendChild(el);
  }
}

if (selectSizeOptions) {
  const selectSizes = document.getElementById('selectSizes');
  const sizesValue = document.getElementById('productSizes').value;
  const sizesOptions = sizesValue.split(',');
  for (var i = 0; i < sizesOptions.length; i++) {
    var opt = sizesOptions[i];
    var el = document.createElement('option');
    el.textContent = opt;
    el.value = opt;
    selectSizes.appendChild(el);
  }
}

$('#productPriceType').on('change', function () {
  console.log('chnagee');
  if (this.value === 'onePriceForm') {
    $('#onePriceForm').show();
    $('#promoPriceForm').hide();
  }
  if (this.value === 'promoPriceForm') {
    $('#promoPriceForm').show();
    $('#onePriceForm').hide();
  }
});

$('.mini-table[data-href]').on('click', function () {
  window.location = $(this).data('href');
  $(this).css({ background: 'darkgray' });
  return false;
});
$('.mini-table > a').on('click', function (e) {
  e.stopPropagation();
});

$('tr[data-href]').on('click', function () {
  window.location = $(this).data('href');
  return false;
});
$('td > a').on('click', function (e) {
  e.stopPropagation();
});

const clipboard = new ClipboardJS('.btn');

clipboard.on('success', function (e) {
  showAlert('success', 'copied Successfully');

  e.clearSelection();
});

clipboard.on('error', function (e) {
  showAlert('error', 'Unable to Copy, try again later');
});

$(document).ready(function () {
  $.fn.dataTable.moment('dddd, MMMM Do YYYY, h:mm:ss a');
  $('#all-table').DataTable({
    paging: true,
    ordering: true,
    scrollCollapse: true,
    searching: true,
    order: [0, 'desc'],
    bInfo: true,
  });
});

$('.sales-today a').click(function (e) {
  e.preventDefault();
  $('.sales-toggle').hide();
  $('#button-sales').html($(this).text());
  var toShow = $(this).attr('href');
  $(toShow).show();
});

$('.trans-today a').click(function (e) {
  e.preventDefault();
  $('#button-trans').html($(this).text());
  $('.trans-toggle').hide();
  var toShow = $(this).attr('href');
  $(toShow).show();
});

$('.toggle-password').click(function () {
  $(this).toggleClass('fa-eye fa-eye-slash');
  var input = $($(this).attr('toggle'));
  if (input.attr('type') == 'password') {
    input.attr('type', 'text');
  } else {
    input.attr('type', 'password');
  }
});
