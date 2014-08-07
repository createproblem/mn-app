/* jshint unused: false */
'use strict';

function Base() {}

Base.prototype.run = function(req, res, next) {};
Base.prototype.errorHandler = function(err) {
  console.log(err);
};
module.exports = Base;
