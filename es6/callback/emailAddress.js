'use strict';

const prompt = require('../prompt'),
      validate = require('../validate'),
      messages = require('../messages');

const { validateEmailAddress } = validate,
      { invalidEmailAddressMessage } = messages;

function emailAddressCallback(next, done, context) {
  const { emailAddress } = context;
  
  if (emailAddress !== null) {
    const valid = validateEmailAddress(emailAddress);

    if (valid) {
      next();
      
      return;
    }
  }

  const description = 'Email address: ',
        validationFunction = validateEmailAddress,
        errorMessage = invalidEmailAddressMessage,
        attempts = 3,
        hidden = false,
        options = {
          description: description,
          validationFunction: validationFunction,
          errorMessage: errorMessage,
          attempts: attempts,
          hidden: hidden
        };

  prompt(options, function(emailAddress) {
    const valid = (emailAddress !== null);

    if (valid) {
      Object.assign(context, {
        emailAddress: emailAddress
      });

      next();
      
      return;
    } 
    
    done();
  });
}

module.exports = emailAddressCallback;

