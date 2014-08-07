'use strict';

var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
  github: {
    id: String,
    email: String,
    token: String,
  }
});

userSchema.methods.toJSON = function() {
  var obj = this.toObject();
  delete obj.__v;
  delete obj.github.token;
  return obj;
};

module.exports = mongoose.model('User', userSchema);
