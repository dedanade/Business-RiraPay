/* eslint-disable */

import axios from 'axios';
import { showAlert } from './alert';
import {
  salesTransBusinessUserID,
  sumOfSalesResult,
  sumOfTransResult,
  hideSalesLoading,
  hideTransLoading,
} from './index';

export const salesToday = async () => {
  try {
    const res = await axios({
      method: 'GET',
      url: `/api/v1/orders/salestoday/${salesTransBusinessUserID}`,
    });

    if (res.data.status === 'success') {
      const todayResult = res.data.data.sumOfCartSalesToday;
      sumOfSalesResult.innerHTML = `₦ ${todayResult}`;
      hideSalesLoading();
    }
  } catch (err) {
    showAlert('error', err);
  }
};

export const salesThisWeek = async () => {
  try {
    const res = await axios({
      method: 'GET',
      url: `/api/v1/orders/salesWeek/${salesTransBusinessUserID}`,
    });

    if (res.data.status === 'success') {
      const weeklyResult = res.data.data.sumOfCartSalesToday;
      sumOfSalesResult.innerHTML = `₦ ${weeklyResult}`;
      hideSalesLoading();
    }
  } catch (err) {
    showAlert('error', err);
  }
};
export const salesThisMonth = async () => {
  try {
    const res = await axios({
      method: 'GET',
      url: `/api/v1/orders/salesmonth/${salesTransBusinessUserID}`,
    });

    if (res.data.status === 'success') {
      const monthlyResult = res.data.data.sumOfCartSalesMonth;
      sumOfSalesResult.innerHTML = `₦ ${monthlyResult}`;
      hideSalesLoading();
    }
  } catch (err) {
    showAlert('error', err);
  }
};

export const salesLifeTime = async () => {
  try {
    const res = await axios({
      method: 'GET',
      url: `/api/v1/orders/saleslifetime/${salesTransBusinessUserID}`,
    });

    if (res.data.status === 'success') {
      const lifeTimeResult = res.data.data.sumOfCartSalesLifeTime;
      sumOfSalesResult.innerHTML = `₦ ${lifeTimeResult}`;
      hideSalesLoading();
    }
  } catch (err) {
    showAlert('error', err);
  }
};
//TRANSACTIONS

export const transToday = async () => {
  try {
    const res = await axios({
      method: 'GET',
      url: `/api/v1/orders/transtoday/${salesTransBusinessUserID}`,
    });

    if (res.data.status === 'success') {
      const transTodayResult = res.data.data.sumOfTransToday;
      sumOfTransResult.innerHTML = `₦ ${transTodayResult}`;
      hideTransLoading();
    }
  } catch (err) {
    showAlert('error', err);
  }
};
export const transThisWeek = async () => {
  try {
    const res = await axios({
      method: 'GET',
      url: `/api/v1/orders/transweek/${salesTransBusinessUserID}`,
    });

    if (res.data.status === 'success') {
      const transWeekResult = res.data.data.sumOfTransWeek;
      sumOfTransResult.innerHTML = `₦ ${transWeekResult}`;
      hideTransLoading();
    }
  } catch (err) {
    showAlert('error', err);
  }
};
export const transThisMonth = async () => {
  try {
    const res = await axios({
      method: 'GET',
      url: `/api/v1/orders/transmonth/${salesTransBusinessUserID}`,
    });

    if (res.data.status === 'success') {
      const transMonthResult = res.data.data.sumOfTransMonth;
      sumOfTransResult.innerHTML = `₦ ${transMonthResult}`;
      hideTransLoading();
    }
  } catch (err) {
    showAlert('error', err);
  }
};
export const transLifeTime = async () => {
  try {
    const res = await axios({
      method: 'GET',
      url: `/api/v1/orders/translifetime/${salesTransBusinessUserID}`,
    });

    if (res.data.status === 'success') {
      const transLifeTimeResult = res.data.data.sumOfTransLifeTime;
      sumOfTransResult.innerHTML = `₦ ${transLifeTimeResult}`;
      hideTransLoading();
    }
  } catch (err) {
    showAlert('error', err);
  }
};
