/* eslint-disable */

import axios from 'axios';
import { showAlert } from './alert';
import { salesTransBusinessUserID, stopLoadingBtnSpinner } from './index';

export const busSignup = async (
  businessName,
  fullName,
  businessEmail,
  businessPhoneNumber,
  businessPassword,
  submitButton
) => {
  try {
    const res = await axios({
      method: 'POST',
      url: '/api/v1/businessUsers/signup',
      data: {
        businessName,
        fullName,
        businessEmail,
        businessPhoneNumber,
        businessPassword,
      },
    });

    if (res.data.status === 'success') {
      console.log('successsss');
      showAlert('success', 'Signup Successfully!');
      window.setTimeout(() => {
        location.assign('/dashboard');
      }, 1500);
    }
  } catch (err) {
    console.log(err);
    showAlert('error', err.response.data.message);
    stopLoadingBtnSpinner(submitButton);
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

export const busResetPassword = async (businessPassword, busToken) => {
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
export const busSendVerifyEmail = async () => {
  try {
    const res = await axios({
      method: 'GET',
      url: `/api/v1/businessUsers/sendverifyemail/${salesTransBusinessUserID}`,
    });
    if (res.data.status === 'success') {
      showAlert('success', `Verify Email Sent`);
      window.setTimeout(() => {
        location.reload();
      }, 1500);
    }
  } catch (err) {
    showAlert('error', 'Unable to Send Email. Kindly Retry');
    console.log(err);
  }
};

export const addNewBus = async (
  fullName,
  businessEmail,
  businessPassword,
  role,
  submitButton
) => {
  try {
    const res = await axios({
      method: 'POST',
      url: '/api/v1/businessUsers/addnew',
      data: {
        fullName,
        businessEmail,
        businessPassword,
        role,
      },
    });

    if (res.data.status === 'success') {
      showAlert('success', 'Signup Successfully!');
      window.setTimeout(() => {
        location.reload();
      }, 1500);
    }
  } catch (err) {
    stopLoadingBtnSpinner(submitButton);
    showAlert('error', err.response.data.message);
  }
};

export const removeBusMember = async (remove_businessID) => {
  try {
    const res = await axios({
      method: 'DELETE',
      url: `/api/v1/businessUsers/delete/${remove_businessID}`,
    });
    if (res.data.status === 'success') {
      showAlert('success', `Member Removed`);
      window.setTimeout(() => {
        location.reload();
      }, 1500);
    }
  } catch (err) {
    showAlert('error', 'Unable remove Member. Kindly Retry');
    console.log(err);
  }
};
