'use strict'

const newUserSchema = {
  description: 'Validation for new sign up',
  properties: {
    firstName: {
      type: 'string',
    },
    lastName: {
      type: 'string',
    },
    email: {
      type: 'string',
      format: 'email',
    },
    password: {
      type: 'string',
    },
    validatePassword: {
      type: 'string',
    },
  },
  additionalProperties: false,
  required: [
    'firstName',
    'lastName',
    'email',
    'password',
    'validatePassword',
  ],
};

module.exports = newUserSchema;
