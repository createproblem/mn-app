/* jshint camelcase: false */
'use strict';

var Service = require('./service');
var label   = require('../models/label');

function LabelService() {
}

LabelService.prototype = new Service(label);

module.exports = new LabelService();
