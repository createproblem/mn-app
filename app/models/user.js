var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
  github: {
    id: String,
    email: String,
    token: String,
  }
});

module.exports = mongoose.model('User', userSchema);
