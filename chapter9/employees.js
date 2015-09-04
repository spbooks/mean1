//Listing 9.9: lib/employees.js

var mongoose = require('mongoose');
//The following two lines added to avoid Error.
//The program hangs indefinitely nonetheless
require('../models/employee');
require('../models/team');
var Employee = mongoose.model('Employee');

exports.getEmployees = getEmployees;
exports.getEmployee = getEmployee;

function getEmployees (callback) {
  Employee.find().sort('name.last').exec(callback);
}

function getEmployee (employeeId, callback) {
  Employee.findOne({
    id: employeeId
  }).populate('team').exec(callback);
}

