import isEmail from 'validator/lib/isEmail';

const regexPasswordLength = /^.{9,50}$/;

export function email(value) {
  return value && !isEmail(value) ? 'Invalid e-mail address' : null;
}

export function password(value) {
  return value && !regexPasswordLength.test(value)
    ? 'Password must be at least 9 characters'
    : null;
}

export function isFilled(value) {
  return value != null && value !== '';
}

export function required(requiredFields, values) {
  return requiredFields.reduce((fields, field) => {
    if (!isFilled(values[field])) {
      // eslint-disable-next-line no-param-reassign
      fields[field] = 'Required';
    }
    return fields;
  }, {});
}
