'use strict'

const loginDataSchema = {
  description: 'Validation for login',
  properties: {
    email: {
      type: 'string',
    },
    password: {
      type: 'string',
    },
  },
  additionalProperties: false,
  required: [
    'email',
    'password',
  ],
};

module.exports = loginDataSchema;
