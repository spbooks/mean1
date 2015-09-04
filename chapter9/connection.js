// Listing 9-5: lib/connection.js

var mongoose = require('mongoose');
var dbUrl = 'mongodb://localhost/employees';
//Change to reflect your configuration if needed

mongoose.connect(dbUrl);

// Close the Mongoose connection on Control+C
process.on('SIGINT', function() {
  mongoose.connection.close(function () {
    console.log('Mongoose default connection disconnected');
    process.exit(0);
  });
});

require('../models/employee');
require('../models/team');
