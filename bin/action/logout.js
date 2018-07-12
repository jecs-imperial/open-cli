'use strict';

const action = require('../action'),
      messages = require('../messages'),
      constants = require('../constants'),
      configurationUtilities = require('../utilities/configuration'),
      retrieveAccessTokenCallback = require('../callback/retrieveAccessToken');

const { LOGOUT_URI } = constants,
      { LOGGED_OUT_MESSAGE } = messages,
      { removeAccessToken } = configurationUtilities;

function logout() {
  const uri = LOGOUT_URI,
        callbacks = [
          retrieveAccessTokenCallback
        ],
        context = {};

  action(callbacks, uri, function(json, done) {
    removeAccessToken();

    console.log(LOGGED_OUT_MESSAGE);

    done();
  }, context);
}

module.exports = logout;
