/*jshint curly: false */
'use strict';

var util           = require('util');
var BaseController = require('./base');
var model          = require('../models/label');

function Label(model) {
  this.model = model;
}

util.inherits(Label, BaseController);

Label.prototype.run = function(req, res) {
  var self = this;
  this.model.find({user: req.user}, function(err, labels) {
    if (err) return self.errorHandler(err);

    res.json(labels);
  });
};

module.exports = new Label(model);
