'use strict';

const TIMEOUT = 10000,
      HOST_URL = 'http://localhost:8002',///https://openmathematics.org',
      POST_METHOD = 'POST',
      UTF_ENCODING = 'utf8',
      LOGIN_URI = '/login',
      LOGOUT_URI = '/logout',
      PUBLISH_URI = '/publish',
      REGISTER_URI = '/register',
      RESET_PASSWORD_URI = '/resetPassword',
      CHANGE_PASSWORD_URI = '/changePassword',
      CONFIRM_EMAIL_ADDRESS_URI = '/confirmEmailAddress',
      RESEND_CONFIRMATION_CODE_URI = '/resendConfirmationCode';

const constants = {
  TIMEOUT: TIMEOUT,
  HOST_URL: HOST_URL,
  POST_METHOD: POST_METHOD,
  UTF_ENCODING: UTF_ENCODING,
  LOGIN_URI: LOGIN_URI,
  LOGOUT_URI: LOGOUT_URI,
  PUBLISH_URI: PUBLISH_URI,
  REGISTER_URI: REGISTER_URI,
  RESET_PASSWORD_URI: RESET_PASSWORD_URI,
  CHANGE_PASSWORD_URI: CHANGE_PASSWORD_URI,
  CONFIRM_EMAIL_ADDRESS_URI: CONFIRM_EMAIL_ADDRESS_URI,
  RESEND_CONFIRMATION_CODE_URI: RESEND_CONFIRMATION_CODE_URI
};

module.exports = constants;
