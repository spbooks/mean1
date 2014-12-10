var m = require('./mmm');

console.log('time after first require ' + m.now);

console.log(m.add(3,5));
console.log(m.multiply(4,5));
console.log(m.factorial(4));

setTimeout(function () {
  m = require('./mmm');
  console.log('time after second require ' + m.now);
}, 5000);
