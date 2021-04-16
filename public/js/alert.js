/* eslint-disable */
export const hideAlert = () => {
  const ViewAlert = document.getElementById(`alert-notification`);
  ViewAlert.style.display = 'none';
};
export const showAlert = (type, msg) => {
  const div = document.createElement('div');
  div.id = 'hideAlertNotification';
  div.innerHTML = '<i class="fa fa-window-close"></i>';

  var alertNotification = document.getElementById(`alert-notification`);

  if (typeof alertNotification != 'undefined' && alertNotification != null) {
    alertNotification.style.display = 'flex';
    alertNotification.className = `alert alert--${type}`;
    alertNotification.innerHTML = `${msg} <span> ${div.outerHTML} </span>`;
  } else {
    const divMarkup = document.createElement('div');
    divMarkup.id = 'alert-notification';
    divMarkup.className = `alert alert--${type}`;
    divMarkup.innerHTML = `${msg} <span> ${div.outerHTML} </span>`;
    document
      .querySelector('body')
      .insertAdjacentHTML('afterbegin', divMarkup.outerHTML);
  }
  window.setTimeout(hideAlert, 3 * 1000);
  const clickHideAlert = document.getElementById('hideAlertNotification');
  const ViewAlert = document.getElementById(`alert-notification`);

  if (clickHideAlert)
    clickHideAlert.addEventListener('click', () => {
      ViewAlert.style.display = 'none';
    });
};
