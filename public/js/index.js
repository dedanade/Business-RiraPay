/*eslint-disable */

import '@babel/polyfill';
import { createProductInput, editProductInput } from './product';
import { busLogout } from './loginAPI';
import {
  account_Lookup_UpdateBankAccount,
  accountNamepaystackLookup,
} from './updateBankAccount';
import { busSendVerifyEmail, removeBusMember } from './signupAPI';

import {
  updatePixel,
  updateTags,
  updateOrderEmails,
  updateShippingOrder,
  updateDelivery,
} from './update';
import { showAlert } from './alert';
import { busLoginInput, busSignupInput, addNewbusInput } from './signup_login';
import { busForgotPassInput, busResetPassInput } from './forgot_resetPass';
import {
  salesThisMonth,
  salesThisWeek,
  salesToday,
  salesLifeTime,
  transToday,
  transThisWeek,
  transThisMonth,
  transLifeTime,
} from './salesTransAPI';

export const sumOfSalesResult = document.getElementById('sumOfSalesResult');

export const sumOfTransResult = document.getElementById('sumOfTransResult');

export const remove_member_businessID = (
  document.getElementById('remove-member-businessID') || {}
).value;

// function mouseover(){
//   for (var e = document.getElementsByName('a')){

//   }
// };

const busloginForm = document.querySelector('.bus-login-form');

const logoutBus = document.querySelector('.logout_bus_btn');

const busSignupForm = document.querySelector('.signup-bus-form');

const addNewBusForm = document.querySelector('.add-new-member-form');

const busForgotForm = document.querySelector('.bus-forgot-form');
const resetBusPassForm = document.querySelector('.reset-bus-pass-form');

const createProductForm = document.querySelector('.create-product-form');
const editProductForm = document.querySelector('.edit-product-form');

const business_pixel_Form = document.getElementById('business-pixel-form');
const tagsForm = document.getElementById('tagsform');
const bankAccountForm = document.getElementById('businessAccount-bank-form');
const updateForm = document.getElementById('updateorderform');
const updateFormmobile = document.getElementById('updateFormmobile');
const updateShipingForm = document.getElementById('shippingForm');
const updateDeliveryForm = document.getElementById('deliveryForm');

const remove_member_ID = (
  document.getElementById('remove-member-businessID') || {}
).value;

const remove_member_btn = document.querySelector(`.remove-member-form`);

const selectColorOptions = document.querySelector('.selectColorOptions');
const selectSizeOptions = document.querySelector('.selectSizeOptions');
const selectPriceOptions = document.querySelector('.selectPriceOptions');

const request_Verify_Email_btn = document.getElementById(
  'request-verify-email_btn'
);

if (request_Verify_Email_btn)
  request_Verify_Email_btn.addEventListener('click', () => {
    busSendVerifyEmail();
  });

const loading_Animation = document.getElementById('loading-animation');

function displayLoadingAnimation() {
  loading_Animation.classList.add('display');
  // to stop loading after some time
  setTimeout(() => {
    loading_Animation.classList.remove('display');
  }, 20000);
}

export const hideLoadingAnimation = function hideLoading() {
  loading_Animation.classList.remove('display');
};

export function loadingBtnSpinner(submitButton) {
  submitButton.classList.add('btnLoadingSpiner');
  submitButton.disabled = true;

  setTimeout(() => {
    submitButton.classList.remove('btnLoadingSpiner');
  }, 20000);
}

export function stopLoadingBtnSpinner(submitButton) {
  submitButton.classList.remove('btnLoadingSpiner');
  submitButton.disabled = false;
}

//// FETCH DAILY, LIFETIME AND MONTHLY SALES

// DISPLAY SALESTRANS LOADIND ANIMATION

//Sales!

const salesLoader = document.getElementById('loading-Sales-Result');
const salesToday_btn = document.getElementById('salesToday_btn');
const salesWeekly_btn = document.getElementById('salesWeekly_btn');
const salesMonthly_btn = document.getElementById('salesMonthly_btn');
const salesLifeTime_btn = document.getElementById('salesLifeTime_btn');

function displaySalesLoading() {
  salesLoader.classList.add('display');
  // to stop loading after some time
  setTimeout(() => {
    salesLoader.classList.remove('display');
  }, 20000);
}

export const hideSalesLoading = function hideLoading() {
  salesLoader.classList.remove('display');
};

if (salesToday_btn)
  salesToday_btn.addEventListener('click', () => {
    displaySalesLoading(), salesToday();
  });
if (salesWeekly_btn)
  salesWeekly_btn.addEventListener('click', () => {
    displaySalesLoading(), salesThisWeek();
  });
if (salesMonthly_btn)
  salesMonthly_btn.addEventListener('click', () => {
    displaySalesLoading(), salesThisMonth();
  });

if (salesLifeTime_btn)
  salesLifeTime_btn.addEventListener('click', () => {
    displaySalesLoading(), salesLifeTime();
  });

//Transactions

const transLoader = document.getElementById('loading-Trans-Result');
const transToday_btn = document.getElementById('transToday_btn');
const transWeekly_btn = document.getElementById('transWeekly_btn');
const transMonthly_btn = document.getElementById('transMonthly_btn');
const transLifeTime_btn = document.getElementById('transLifeTime_btn');

function displayTransLoading() {
  transLoader.classList.add('display');
  // to stop loading after some time
  setTimeout(() => {
    transLoader.classList.remove('display');
  }, 20000);
}

export const hideTransLoading = function hideLoading() {
  transLoader.classList.remove('display');
};

if (transToday_btn)
  transToday_btn.addEventListener('click', () => {
    displayTransLoading(), transToday();
  });
if (transWeekly_btn)
  transWeekly_btn.addEventListener('click', () => {
    displayTransLoading(), transThisWeek();
  });
if (transMonthly_btn)
  transMonthly_btn.addEventListener('click', () => {
    displayTransLoading(), transThisMonth();
  });
if (transLifeTime_btn)
  transLifeTime_btn.addEventListener('click', () => {
    displayTransLoading(), transLifeTime();
  });

if (remove_member_btn)
  remove_member_btn.addEventListener('submit', () => {
    console.log(document.getElementById('remove-member-businessID').value);
    console.log('Got it');
  });

function removeMemberFuction(id) {
  const remove_businessId = id;
  removeBusMember(remove_businessId);
}
window.removeMemberFuction = removeMemberFuction;

if (busloginForm) busloginForm.addEventListener('submit', busLoginInput);

if (logoutBus) logoutBus.addEventListener('click', busLogout);

if (busSignupForm) busSignupForm.addEventListener('submit', busSignupInput);

if (addNewBusForm) addNewBusForm.addEventListener('submit', addNewbusInput);

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
    const submitButton = e.submitter;
    loadingBtnSpinner(submitButton);
    const facebookPixelId = document.getElementById('business-pixelId').value;
    const facebookPixelCurrency = document.getElementById(
      'business-pixel-currency'
    ).value;
    const facebookPixelValue = document.getElementById('business-pixel-value')
      .value;

    updatePixel(
      facebookPixelId,
      facebookPixelCurrency,
      facebookPixelValue,
      submitButton
    );
  });

const inputAccountNumber = document.getElementById(
  'account_number_businessAccount'
);

if (inputAccountNumber)
  inputAccountNumber.addEventListener('blur', () => {
    const account_number = inputAccountNumber.value;
    const bankIdOptions = document.getElementById('bank_code_businessAccount');
    const saveBankDetailsbtn = document.getElementById('save-bank-details-btn');
    const accountNameDisplay = document.getElementById(
      'business-accountNumber-result'
    );
    accountNameDisplay.innerHTML = '';
    displayLoadingAnimation();

    const bankId = bankIdOptions.value;

    accountNamepaystackLookup(
      account_number,
      bankId,
      accountNameDisplay,
      saveBankDetailsbtn
    );
  });

if (bankAccountForm)
  bankAccountForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const accountNumber = document.getElementById(
      'account_number_businessAccount'
    ).value;
    const bankIdOptions = document.getElementById('bank_code_businessAccount');
    const bankId = bankIdOptions.value;
    const bankName = bankIdOptions.options[bankIdOptions.selectedIndex].text;

    account_Lookup_UpdateBankAccount(accountNumber, bankId, bankName);
  });

if (tagsForm)
  tagsForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const tags = document.getElementById('order-tags').value;
    const orderId = document.getElementById('orderid').value;
    const submitButton = e.submitter;
    loadingBtnSpinner(submitButton);
    updateTags(tags, orderId, submitButton);
  });

$('.create-tags-pencil').on('click', function (e) {
  const target = e.target || e.srcElement;
  const orderId = target.id;
  const allOrdersTagsForm = document.getElementById(
    `order-form-tags-${orderId}`
  );
  allOrdersTagsForm.addEventListener('submit', (e) => {
    e.preventDefault();
    console.log(e);
    const tags = document.getElementById(`input-order-tags-${orderId}`).value;
    const submitButton = e.submitter;
    loadingBtnSpinner(submitButton);
    updateTags(tags, orderId, submitButton);
  });
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
    const delOrderId = document.getElementById('orderid').value;
    updateDelivery(delOrderId);
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

//COpy Tooltip Notification

$('.clipboard-btn').tooltip({
  trigger: 'click',
  placement: 'bottom',
});

function setTooltip(btn, message) {
  btn.tooltip('hide').attr('data-original-title', message).tooltip('show');
}

function hideTooltip(btn) {
  setTimeout(function () {
    btn.tooltip('hide');
  }, 1000);
}

const clipboard = new ClipboardJS('.clipboard-btn');

clipboard.on('success', function (e) {
  var btn = $(e.trigger);
  setTooltip(btn, 'Copied');
  hideTooltip(btn);
  e.clearSelection();
});

clipboard.on('error', function (e) {
  showAlert('error', 'Unable to Copy, try again later');
});

$(document).ready(function () {
  $.fn.dataTable.moment('dddd, DD/MMM/YY, h:mma');
  $('#all-table').DataTable({
    paging: true,
    ordering: true,
    scrollCollapse: true,
    searching: true,
    order: [0, 'desc'],
    bInfo: true,
    stateSave: true,
  });
});

$('.sales-today a').click(function (e) {
  e.preventDefault();
  $('#button-sales').html($(this).text());
});

$('.trans-today a').click(function (e) {
  e.preventDefault();
  $('#button-trans').html($(this).text());
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
