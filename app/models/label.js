'use strict';

var mongoose = require('mongoose');

var labelSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    index: true
  },
  name: String
});

labelSchema.index({name: 1, user: 1}, {unique: true});

labelSchema.methods.toJSON = function() {
  var obj = this.toObject();
  delete obj.__v;
  delete obj.user;

  return obj;
};

module.exports = mongoose.model('Label', labelSchema);
