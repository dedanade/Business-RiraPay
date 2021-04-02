/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alert';
import { stopLoadingBtnSpinner } from './index';

export const createProduct = async (
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
  thankYouPage,
  submitBtnText,
  submitBtnBGColor,
  submitBtnColor,
  submitButton
) => {
  try {
    const res = await axios({
      method: 'POST',
      url: '/api/v1/products',
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
          thankYouPage,
        },
        formStyle: {
          submitBtnText,
          submitBtnBGColor,
          submitBtnColor,
        },
      },
    });

    const productSlug = res.data.data.newProduct.slug;
    const productId = res.data.data.newProduct._id;
    if (res.data.status === 'success') {
      showAlert('success', 'Product created Successfully!');
      window.setTimeout(() => {
        location.assign(`/myproduct/${productSlug}/${productId}`);
      }, 1500);
    }
  } catch (err) {
    stopLoadingBtnSpinner(submitButton);
    showAlert('error', err.response.data.message);
  }
};
