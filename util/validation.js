function validCredentials(email, password) {
  return email && email.includes('@') && password && password.trim().length > 5;
}

function isEmpty(value) {
  return !value || value.trim() == '';
}

function userDetailsAreValid(email, password, name, street, postal, city) {
  return (
    validCredentials(email, password) &&
    !isEmpty(name) &&
    !isEmpty(street) &&
    !isEmpty(postal) &&
    !isEmpty(city)
  );
}

function emailIsConfirmed(email, confirmEmail) {
  return email === confirmEmail;
}

module.exports = { userDetailsAreValid, emailIsConfirmed };
