'use strict';

const action = require('../action'),
      constants = require('../constants');

function logout() {
  const callbacks = [],
        context = {},
        uri = 'logout';

  action(callbacks, context, uri);
}

module.exports = logout;
