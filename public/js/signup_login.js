/* eslint-disable */
import { busSignup } from './signupAPI';
import { busLogin } from './loginAPI';

export const busSignupInput = (e) => {
  e.preventDefault();
  const businessName = document.getElementById('input-bus-name').value;
  const businessEmail = document.getElementById('input-bus-email').value;
  const businessPhoneNumber = document.getElementById('input-bus-phone').value;
  const businessPassword = document.getElementById('input-bus-password').value;
  busSignup(businessName, businessEmail, businessPhoneNumber, businessPassword);
};

export const busLoginInput = (e) => {
  e.preventDefault();
  const businsessEmail = document.getElementById('email-bus-login').value;
  const busisnessPassword = document.getElementById('pass-bus-login').value;
  busLogin(businsessEmail, busisnessPassword);
};
