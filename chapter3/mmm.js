exports.add = add;
exports.multiply = multiply;
exports.factorial = factorial;

exports.now = Date.now();

function add (number1, number2) {
  return parseInt(number1, 10) + parseInt(number2, 10);
}

function multiply (number1, number2) {
  return parseInt(number1, 10) * parseInt(number2, 10);
}

function factorial (number) {
  if (number === 0) {
    return 1;
  }
  else {
    return number * factorial(number - 1);
  }
}

function privateMethod () {
  console.log('not accessable from outside this file')
}
