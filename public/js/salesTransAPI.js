/* eslint-disable */

import axios from 'axios';
import { showAlert } from './alert';
import {
  sumOfSalesResult,
  sumOfTransResult,
  hideSalesLoading,
  hideTransLoading,
} from './index';

export const salesToday = async (productId) => {
  try {
    if (productId) {
      var url = `/api/v1/orders/salestoday?productId=${productId}`;
    } else {
      var url = `/api/v1/orders/salestoday`;
    }

    const res = await axios({
      method: 'GET',
      url,
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

export const salesThisWeek = async (productId) => {
  try {
    if (productId) {
      var url = `/api/v1/orders/salesWeek?productId=${productId}`;
    } else {
      var url = `/api/v1/orders/salesWeek`;
    }
    const res = await axios({
      method: 'GET',
      url,
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
export const salesThisMonth = async (productId) => {
  try {
    if (productId) {
      var url = `/api/v1/orders/salesmonth?productId=${productId}`;
    } else {
      var url = `/api/v1/orders/salesmonth`;
    }
    const res = await axios({
      method: 'GET',
      url,
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

export const salesLifeTime = async (productId) => {
  try {
    if (productId) {
      var url = `/api/v1/orders/saleslifetime?productId=${productId}`;
    } else {
      var url = `/api/v1/orders/saleslifetime`;
    }
    const res = await axios({
      method: 'GET',
      url,
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

export const transToday = async (productId) => {
  try {
    if (productId) {
      var url = `/api/v1/orders/transtoday?productId=${productId}`;
    } else {
      var url = `/api/v1/orders/transtoday`;
    }
    const res = await axios({
      method: 'GET',
      url,
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
export const transThisWeek = async (productId) => {
  try {
    if (productId) {
      var url = `/api/v1/orders/transweek?productId=${productId}`;
    } else {
      var url = `/api/v1/orders/transweek`;
    }
    const res = await axios({
      method: 'GET',
      url,
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
export const transThisMonth = async (productId) => {
  try {
    if (productId) {
      var url = `/api/v1/orders/transmonth?productId=${productId}`;
    } else {
      var url = `/api/v1/orders/transmonth`;
    }
    const res = await axios({
      method: 'GET',
      url,
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
export const transLifeTime = async (productId) => {
  try {
    if (productId) {
      var url = `/api/v1/orders/translifetime?productId=${productId}`;
    } else {
      var url = `/api/v1/orders/translifetime`;
    }
    const res = await axios({
      method: 'GET',
      url,
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
