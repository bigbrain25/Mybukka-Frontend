import Validator from 'validatorjs';

const rules = {
  address: 'required',
  name: 'required',
  mobileNumber: 'required|min:8',
  deliveryInstructions: 'string',
  location: 'required|boolean'
};

// req_add: 'An address is required.',
// card_num: 'Card number is invalid.',
//   num: 'this field can only be numbers',
const errorMessages = {
  boolean: 'this field can only be a boolean',
  alpha: 'this field can only be letters',
  required: 'Required.',
  min: 'this field is not valid',
  max: 'this field is too long'
};

/**
 * @param {object} data containing key:value pairs
 * of field and value to be validated
 * @param {string} field field in rules to run validation against
 * @param {object} rules rules validation
 * @returns {object} containing key:value pairs of a field:errormessage
 */

export const validateAField = (data, field) => {
  const validation = new Validator(data, rules, errorMessages);
  validation.passes();
  let firstError = validation.errors.first(field);
  if (firstError === false) firstError = '';
  return {
    message: firstError,
  };
};

/**
 *
 * @param {object} data object to run rules against
 * @param {object} rules object to run rules against
 * @returns {object} containing keys:value pair of field:errormessage
 *
 */
export const validateAllFields = (data) => {
  const validation = new Validator(data, rules, errorMessages);
  validation.passes();
  const errors = validation.errors.all();
  Object.keys(errors).forEach((errorKey) => {
    // reassigns the key to a destructured
    // version of the error message
    [errors[errorKey]] = errors[errorKey];
  });
  return { errors, passes: validation.passes() };
};
