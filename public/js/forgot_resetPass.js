/* eslint-disable */

import { busForgotPassword, busResetPassword } from './signupAPI';

export const busForgotPassInput = (e) => {
  e.preventDefault();
  const businessEmail = document.getElementById('bus-forgot-email').value;
  busForgotPassword(businessEmail);
};

export const busResetPassInput = (e) => {
  e.preventDefault();
  const businessPassword = document.getElementById('reset-bus-password').value;
  const confirmPassword = document.getElementById('reset-bus-confirm-password')
    .value;
  if (businessPassword != confirmPassword) {
    alert('New and confirm password must be the same');
  } else busResetPassword(businessPassword);
};
