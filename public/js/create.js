/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alert';
export const createProduct = async (
  productName,
  price,
  stock,
  additionalInfo,
  discount,
  codOption,
  colours,
  sizes,
  promoQtyPrice,
  facebookPixelId,
  facebookCurrency,
  facebookValue
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
        discount,
        codOption,
        colours,
        sizes,
        promoQtyPrice,
        facebookPixelId,
        facebookCurrency,
        facebookValue,
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
    showAlert('error', err.response.data.message);
  }
};
