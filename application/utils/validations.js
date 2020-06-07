export function ValidUsername(value) {
  let pattern = new RegExp('^[a-zA-Z0-9]*$');
  return pattern.test(value);
}

export function ValidName(value) {
  let pattern = new RegExp('^[a-zA-Z ]*$');
  return pattern.test(value);
}

export function ValidEmail(value) {
  let pattern = new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);
  return pattern.test(value);
}

export function ValidPassword(value) {
  return value.length >= 5;
}
