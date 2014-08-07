/*jshint curly: false */
'use strict';

var util = require('util');
var BaseController = require('./base');
var model = require('../models/user');

function User(model) {
  this.model = model;
}

util.inherits(User, BaseController);

User.prototype.run = function(req, res) {
  res.json(req.user);
};

module.exports = new User(model);
