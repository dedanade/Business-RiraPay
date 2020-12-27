/* eslint-disable */

import axios from 'axios';
import { showAlert } from './alert';
import { token, busToken } from './index';

export const busSignup = async (
  businessName,
  businessEmail,
  businessPhoneNumber,
  businessPassword
) => {
  try {
    const res = await axios({
      method: 'POST',
      url: '/api/v1/businessUsers/signup',
      data: {
        businessName,
        businessEmail,
        businessPhoneNumber,
        businessPassword,
      },
    });

    if (res.data.status === 'success') {
      showAlert('success', 'Signup Successfully!');
      window.setTimeout(() => {
        location.assign('/dashboard');
      }, 1500);
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};

export const busForgotPassword = async (businessEmail) => {
  try {
    const res = await axios({
      method: 'POST',
      url: '/api/v1/businessUsers/forgotPassword',
      data: {
        businessEmail,
      },
    });

    // const businessUserEmail = res.data.businessUserEmail;

    if (res.data.status === 'success') {
      showAlert(
        'success',
        `Successfully! Check Your email Address ${businessEmail} for Instruction`
      );
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};

export const busResetPassword = async (businessPassword) => {
  try {
    const res = await axios({
      method: 'POST',
      url: `/api/v1/businessUsers/resetPassword/${busToken}`,
      data: {
        businessPassword,
      },
    });

    if (res.data.status === 'success') {
      showAlert('success', `Your Password was succesfully Changed`);
      window.setTimeout(() => {
        location.assign('/dashboard');
      }, 1500);
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};
