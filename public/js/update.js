/* eslint-disable */

import axios from 'axios';
import { showAlert } from './alert';
import { stopLoadingBtnSpinner } from './index';

export const updatePixel = async (
  facebookPixelId,
  facebookCurrency,
  facebookValue,
  submitButton
) => {
  try {
    const res = await axios({
      method: 'PATCH',
      url: '/api/v1/businessUsers/updateMyPixel',
      data: {
        facebookPixelId,
        facebookCurrency,
        facebookValue,
      },
    });
    if (res.data.status === 'success') {
      stopLoadingBtnSpinner(submitButton);
      showAlert(
        'success',
        'Your Pixel has been Updated. Refresh this page and check your facebook pixel Helper Extention'
      );
      window.setTimeout(() => {
        location.reload();
      }, 1500);
    }
  } catch (err) {
    stopLoadingBtnSpinner(submitButton);
    showAlert('success', 'Something is wrong somewhere. Try again later');
    console.log(err.response.data.message);
  }
};

export const updateTags = async (tags, orderId, submitButton) => {
  try {
    const res = await axios({
      method: 'PATCH',
      url: `/api/v1/orders/${orderId}`,
      data: {
        tags,
      },
    });

    if (res.data.status === 'success') {
      stopLoadingBtnSpinner(submitButton);
      const tags = res.data.data.Updatedorder.tags;
      const pOrdertags = submitButton
        .closest('td')
        .querySelector('.p-order-tags');
      const tagsForm = submitButton.closest('form');
      pOrdertags.style.display = 'block';
      tagsForm.style.display = 'none';
      pOrdertags.innerText = tags;
    }
  } catch (err) {
    showAlert('error', 'Unable to update tags. Try again');
    console.log(err);
  }
};

export const updateOrderEmails = async (orders) => {
  try {
    const res = await axios({
      method: 'PATCH',
      url: `/api/v1/users/updateOrders`,
      data: {
        orders,
      },
    });

    if (res.data.status === 'success') {
      showAlert('success', 'Order Updated successfully');
      window.setTimeout(() => {
        location.reload();
      }, 1500);
    }
  } catch (err) {
    showAlert(
      'error',
      'It seems we cannot find any order with your email Address. If you think this is an error, kindly contact us'
    );
    console.log(`🔥🔥🔥 ${err.response.data.message}`);
  }
};

export const updateShippingOrder = async (
  OrderId,
  logisticName,
  trackingNum
) => {
  try {
    const res = await axios({
      method: 'PATCH',
      url: `/api/v1/orders/ship`,
      data: {
        OrderId,
        logisticName,
        trackingNum,
      },
    });

    if (res.data.status === 'success') {
      showAlert('success', 'Order has been marked as shipped');
      window.setTimeout(() => {
        location.reload();
      }, 1500);
    }
  } catch (err) {
    showAlert(
      'error',
      'Opps! Unable to update order. Try again later. If the error persist, kindly contact us ASAP'
    );
    console.log(`🔥🔥🔥 ${err.response.data.message}`);
  }
};
export const updateCancelOrder = async (OrderId) => {
  try {
    const res = await axios({
      method: 'GET',
      url: `/api/v1/orders/cancel/${OrderId}`,
      data: {
        OrderId,
      },
    });

    if (res.data.status === 'success') {
      showAlert('success', 'Order has been marked as Canceled');
      window.setTimeout(() => {
        location.reload();
      }, 1500);
    }
  } catch (err) {
    showAlert(
      'error',
      'Opps! Unable to update order. Try again later. If the error persist, kindly contact us ASAP'
    );
    console.log(`🔥🔥🔥 ${err.response.data.message}`);
  }
};

export const cloneProductApi = async (productId) => {
  try {
    const res = await axios({
      method: 'GET',
      url: `/api/v1/products/clone/${productId}`,
    });
    if (res.data.status === 'success') {
      showAlert('success', 'Product Duplicated!');
      location.reload();
    }
  } catch (err) {
    showAlert(
      'error',
      'Opps! Unable to Duplicate product. Try again later. If the error persist, kindly contact us ASAP'
    );
    console.log(err);
  }
};

export const updateProduct = async (
  productName,
  price,
  stock,
  additionalInfo,
  delInfo,
  discount,
  colours,
  sizes,
  promoQtyPrice,
  FbId,
  currency,
  value,
  conversionEvent,
  submitBtnText,
  submitBtnBGColor,
  submitBtnColor,
  productId,
  submitButton
) => {
  try {
    const res = await axios({
      method: 'PATCH',
      url: `/api/v1/products/${productId}`,
      data: {
        productName,
        price,
        stock,
        additionalInfo,
        delInfo,
        discount,
        colours,
        sizes,
        promoQtyPrice,
        facebookPixel: {
          FbId,
          currency,
          value,
          conversionEvent,
        },
        formStyle: {
          submitBtnText,
          submitBtnBGColor,
          submitBtnColor,
        },
      },
    });
    const productSlug = res.data.data.data.slug;
    const updateproductid = res.data.data.data._id;
    if (res.data.status === 'success') {
      showAlert('success', 'Product Updated!');
      stopLoadingBtnSpinner(submitButton);
      window.setTimeout(() => {
        location.assign(`/myproduct/${productSlug}/${updateproductid}`);
      }, 1500);
    }
  } catch (err) {
    stopLoadingBtnSpinner(submitButton);
    showAlert(
      'error',
      'Opps! Unable to update product. Try again later. If the error persist, kindly contact us ASAP'
    );
    console.log(err);
  }
};

export const updateDelivery = async (DelOrderId) => {
  try {
    const res = await axios({
      method: 'GET',
      url: `/api/v1/orders/deliver/${DelOrderId}`,
    });

    if (res.data.status === 'success') {
      stopLoadingBtnSpinner(submitButton);
      showAlert('success', 'Order has been marked as Delivered');
      window.setTimeout(() => {
        location.reload();
      }, 1500);
    }
  } catch (err) {
    showAlert(
      'error',
      'Opps! Unable to update order. Try again later. If the error persist, kindly contact us ASAP'
    );
    console.log(`🔥🔥🔥 ${err.response.data.message}`);
  }
};
export const updateSchedule = async (schOrderId, scheduledAt) => {
  try {
    const res = await axios({
      method: 'PATCH',
      url: `/api/v1/orders/schedule/${schOrderId}`,
      data: {
        scheduledAt,
      },
    });

    if (res.data.status === 'success') {
      showAlert('success', 'Order has been Scheduled');
      window.setTimeout(() => {
        location.reload();
      }, 1500);
    }
  } catch (err) {
    showAlert(
      'error',
      'Opps! Unable to update order. Try again later. If the error persist, kindly contact us ASAP'
    );
    console.log(`🔥🔥🔥 ${err.response.data.message}`);
  }
};
