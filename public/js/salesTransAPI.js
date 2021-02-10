/* eslint-disable */

import axios from 'axios';
import { showAlert } from './alert';
import {
  sumOfSalesResult,
  sumOfTransResult,
  hideSalesLoading,
  hideTransLoading,
} from './index';

export const salesToday = async () => {
  try {
    const res = await axios({
      method: 'GET',
      url: `/api/v1/orders/salestoday`,
    });

    if (res.data.status === 'success') {
      const todayResult = res.data.data.sumOfCartSalesToday;
      sumOfSalesResult.innerHTML = `₦ ${todayResult}`;
      hideSalesLoading();
    }
  } catch (err) {
    hideSalesLoading();
    showAlert('error', 'Unable to check this right now. Try again Later');
    console.log(err);
  }
};

export const salesThisWeek = async () => {
  try {
    const res = await axios({
      method: 'GET',
      url: `/api/v1/orders/salesWeek`,
    });

    if (res.data.status === 'success') {
      const weeklyResult = res.data.data.sumOfCartSalesWeek;
      sumOfSalesResult.innerHTML = `₦ ${weeklyResult}`;
      hideSalesLoading();
    }
  } catch (err) {
    hideSalesLoading();
    showAlert('error', 'Unable to check this right now. Try again Later');
    console.log(err);
  }
};
export const salesThisMonth = async () => {
  try {
    const res = await axios({
      method: 'GET',
      url: `/api/v1/orders/salesmonth`,
    });

    if (res.data.status === 'success') {
      const monthlyResult = res.data.data.sumOfCartSalesMonth;
      sumOfSalesResult.innerHTML = `₦ ${monthlyResult}`;
      hideSalesLoading();
    }
  } catch (err) {
    hideSalesLoading();
    showAlert('error', 'Unable to check this right now. Try again Later');
    console.log(err);
  }
};

export const salesLifeTime = async () => {
  try {
    const res = await axios({
      method: 'GET',
      url: `/api/v1/orders/saleslifetime`,
    });

    if (res.data.status === 'success') {
      const lifeTimeResult = res.data.data.sumOfCartSalesLifeTime;
      sumOfSalesResult.innerHTML = `₦ ${lifeTimeResult}`;
      hideSalesLoading();
    }
  } catch (err) {
    hideSalesLoading();
    showAlert('error', 'Unable to check this right now. Try again Later');
    console.log(err);
  }
};
//TRANSACTIONS

export const transToday = async () => {
  try {
    const res = await axios({
      method: 'GET',
      url: `/api/v1/orders/transtoday`,
    });

    if (res.data.status === 'success') {
      const transTodayResult = res.data.data.sumOfTransToday;
      sumOfTransResult.innerHTML = `₦ ${transTodayResult}`;
      hideTransLoading();
    }
  } catch (err) {
    hideTransLoading();
    showAlert('error', 'Unable to check this right now. Try again Later');
    console.log(err);
  }
};
export const transThisWeek = async () => {
  try {
    const res = await axios({
      method: 'GET',
      url: `/api/v1/orders/transweek`,
    });

    if (res.data.status === 'success') {
      const transWeekResult = res.data.data.sumOfTransWeek;
      sumOfTransResult.innerHTML = `₦ ${transWeekResult}`;
      hideTransLoading();
    }
  } catch (err) {
    hideTransLoading();
    showAlert('error', 'Unable to check this right now. Try again Later');
    console.log(err);
  }
};
export const transThisMonth = async () => {
  try {
    const res = await axios({
      method: 'GET',
      url: `/api/v1/orders/transmonth`,
    });

    if (res.data.status === 'success') {
      const transMonthResult = res.data.data.sumOfTransMonth;
      sumOfTransResult.innerHTML = `₦ ${transMonthResult}`;
      hideTransLoading();
    }
  } catch (err) {
    hideTransLoading();
    showAlert('error', 'Unable to check this right now. Try again Later');
    console.log(err);
  }
};
export const transLifeTime = async () => {
  try {
    const res = await axios({
      method: 'GET',
      url: `/api/v1/orders/translifetime`,
    });

    if (res.data.status === 'success') {
      const transLifeTimeResult = res.data.data.sumOfTransLifeTime;
      sumOfTransResult.innerHTML = `₦ ${transLifeTimeResult}`;
      hideTransLoading();
    }
  } catch (err) {
    hideTransLoading();
    showAlert('error', 'Unable to check this right now. Try again Later');
    console.log(err);
  }
};
