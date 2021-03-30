/* eslint-disable */
import { busSignup, addNewBus } from './signupAPI';
import { busLogin } from './loginAPI';
import { loadingBtnSpinner } from './index';

export const busSignupInput = (e, submitButton) => {
  e.preventDefault();
  const businessName = document.getElementById('input-bus-name').value;
  const fullName = document.getElementById('input-bus-fullname').value;
  const businessEmail = document.getElementById('input-bus-email').value;
  const businessPhoneNumber = document.getElementById('input-bus-phone').value;
  const businessPassword = document.getElementById('input-bus-password').value;
  loadingBtnSpinner(submitButton);
  busSignup(
    businessName,
    fullName,
    businessEmail,
    businessPhoneNumber,
    businessPassword,
    submitButton
  );
};

export const addNewbusInput = (e, submitButton) => {
  e.preventDefault();
  const fullName = document.getElementById('input-new-staff-fullname').value;
  const businessEmail = document.getElementById('input-new-staff-emailAddress')
    .value;
  const businessPassword = document.getElementById('input-new-staff-password')
    .value;
  const role = document.getElementById('input-new-staff-role').value;
  loadingBtnSpinner(submitButton);
  addNewBus(fullName, businessEmail, businessPassword, role, submitButton);
};

export const busLoginInput = (e, submitButton) => {
  e.preventDefault();
  const businsessEmail = document.getElementById('email-bus-login').value;
  const busisnessPassword = document.getElementById('pass-bus-login').value;
  loadingBtnSpinner(submitButton);
  busLogin(businsessEmail, busisnessPassword, submitButton);
};
