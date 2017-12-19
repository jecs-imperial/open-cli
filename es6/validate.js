'use strict';

function validateUsername(username) { return  /^[a-z0-9]{2,16}(?:-[a-z0-9]{2,16}){0,4}$/.test(username); }

function validatePassword(password) { return /^[a-zA-Z0-9!@#$%^&*_.,\-]{8,24}$/.test(password); }

function validateEmailAddress(emailAddress) { return /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,16}$/.test(emailAddress); }

function validateConfirmationCode(confirmationCode) { return /^[a-zA-Z]{8}$/.test(confirmationCode); }

module.exports = {
  validateUsername: validateUsername,
  validatePassword: validatePassword,
  validateEmailAddress: validateEmailAddress,
  validateConfirmationCode: validateConfirmationCode
};
