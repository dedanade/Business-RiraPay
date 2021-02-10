/* eslint-disable */

import axios from 'axios';
import { showAlert } from './alert';
import { hideLoadingAnimation } from './index';

const updateBusBankAccount = async (
  bankName,
  accountNumber,
  bankCode,
  bankAccountName
) => {
  try {
    const res = await axios({
      method: 'PATCH',
      url: `/api/v1/businessUsers/updatebank`,
      data: {
        bankName,
        accountNumber,
        bankCode,
        bankAccountName,
      },
    });
    if (res.data.status === 'success') {
      showAlert('success', 'Bank Account Linked!');
      window.setTimeout(() => {
        location.reload();
      }, 1500);
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};
export const account_Lookup_UpdateBankAccount = async (
  accountNumber,
  bank_id,
  bankName
) => {
  try {
    const res = await axios({
      method: 'GET',
      proxy: {
        hostname: 'api.paystack.co',
        port: 443,
      },
      url: `https://api.paystack.co/bank/resolve?account_number=${accountNumber}&bank_code=${bank_id}`,
      headers: {
        Authorization: `Bearer sk_test_600df1fa26323e6e9b14ec7731a7efbf4e13912f`,
      },
    });
    if (res.data.status === true) {
      const resAccountName = res.data.data.account_name;
      const resAccNum = res.data.data.account_number;
      const resBankId = res.data.data.bank_id;
      updateBusBankAccount(bankName, resAccNum, resBankId, resAccountName);
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};

export const accountNamepaystackLookup = async (
  accountNumber,
  bank_id,
  accountNameDisplayEL,
  saveBtn
) => {
  try {
    const res = await axios({
      method: 'GET',
      proxy: {
        hostname: 'api.paystack.co',
        port: 443,
      },
      url: `https://api.paystack.co/bank/resolve?account_number=${accountNumber}&bank_code=${bank_id}`,
      headers: {
        Authorization: `Bearer sk_test_600df1fa26323e6e9b14ec7731a7efbf4e13912f`,
      },
    });
    if (res.data.status === true) {
      hideLoadingAnimation();
      const resAccountName = res.data.data.account_name;
      accountNameDisplayEL.innerHTML = resAccountName;
      saveBtn.disabled = false;
    }
  } catch (error) {
    hideLoadingAnimation();
    if (error.response) {
      const resMessage = error.response.data.message;
      if (resMessage === 'bank_code is required') {
        accountNameDisplayEL.innerHTML =
          'Kindly pick a bank name and retype the account number';
      } else if (
        resMessage ===
        'Could not resolve account name. Check parameters or try again.'
      ) {
        accountNameDisplayEL.innerHTML =
          'Could not get your account name right now. Double check your account number and bank and try again';
      } else {
        accountNameDisplayEL.innerHTML = resMessage;
      }
    } else {
      // Something happened in setting up the request and triggered an Error
      console.log('Error', error.message);
      accountNameDisplayEL.innerHTML =
        'Something went wrong. Reload and try again';
    }
  }
};
