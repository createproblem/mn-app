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

labelSchema.virtual('id').get(function() {
    return this._id.toHexString();
});

labelSchema.set('toJSON', {
    virtuals: true
});

module.exports = mongoose.model('Label', labelSchema);
