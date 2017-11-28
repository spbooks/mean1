var util = require('util');
var EventEmitter = require('events').EventEmitter;

/* Counter event emitter is instantiated */
var counter = new Counter();

/* Counter function */
function Counter(){
	var self = this;

	EventEmitter.call(this); // call EventEmitter constructor
	var count = 0;

	this.start = function() {
		this.emit('start');

		setInterval(function() {
			self.emit('count', count);
			++count;
		}, 1000);
	};
}

util.inherits(Counter, EventEmitter); // setup inheritance

/* Using on() method to listen for start and count event emitters */
// counter.on('start', function() {
// 	console.log('start event');
// });

// counter.on('count', function(count) {
// 	console.log('count = ' + count);
// });

/* Using once() method to listen for start and count event emitters */
counter.once('start', function() {
	console.log('start event');
});

counter.once('count', function(count) {
	console.log('count = ' + count);
});

counter.start();