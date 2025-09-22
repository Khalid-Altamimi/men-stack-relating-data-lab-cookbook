const mongoose = require('mongoose');

const foodSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  category: String,
    quantity: {
    type: Number,
    default:1,
  },
});


const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  pantry:[foodSchema],
});

const User = mongoose.model('User', userSchema);

module.exports = User;
