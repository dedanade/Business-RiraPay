/* eslint-disable */

import axios from 'axios';
import { showAlert } from './alert';
// import { //stopLoadingBtnSpinner } from './index';

export const busLogin = async (
  businessEmail,
  businessPassword,
  submitButton
) => {
  try {
    const res = await axios({
      method: 'POST',
      url: '/api/v1/businessUsers/login',
      data: {
        businessEmail,
        businessPassword,
      },
    });

    if (res.data.status === 'success') {
      showAlert('success', 'logged in Successfully!');
      window.setTimeout(() => {
        location.assign('/dashboard');
      }, 1500);
    }
  } catch (err) {
    //stopLoadingBtnSpinner(submitButton);
    showAlert('error', err.response.data.message);
  }
};

export const busLogout = async () => {
  try {
    const res = await axios({
      method: 'Get',
      url: '/api/v1/businessUsers/logout',
    });

    if (res.data.status === 'success') {
      showAlert('success', 'Logged out Successfully!');
      window.setTimeout(() => {
        location.assign('/login');
      }, 1500);
    }
  } catch (err) {
    showAlert('error', 'Unable to Log out right now. Try again later');
  }
  console.log(`🔥🔥 ${err}`);
};
