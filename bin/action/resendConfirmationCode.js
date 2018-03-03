'use strict';

const action = require('../action'),
      messages = require('../messages'),
      constants = require('../constants'),
      checkLoggedIn = require('../callback/checkLoggedIn'),
      retrieveAccessToken = require('../callback/retrieveAccessToken');

const { RESEND_CONFIRMATION_CODE_URI } = constants,
      { SUCCESSFUL_RESEND_CONFIRMATION_CODE_MESSAGE, FAILED_RESEND_CONFIRMATION_CODE_MESSAGE } = messages;

function resendConfirmationCode() {
  const callbacks = [
          checkLoggedIn,
          retrieveAccessToken
        ],
        context = {},
        uri = RESEND_CONFIRMATION_CODE_URI;

  action(callbacks, context, uri, function(json) {
    const { success } = json;

    success ?
      console.log(SUCCESSFUL_RESEND_CONFIRMATION_CODE_MESSAGE) :
        console.log(FAILED_RESEND_CONFIRMATION_CODE_MESSAGE);
  });
}

module.exports = resendConfirmationCode;
