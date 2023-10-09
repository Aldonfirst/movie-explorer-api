const mongoose = require('mongoose');
const { validationMessage } = require('../utils/errorMessage');
const { emailRegex } = require('../utils/constants');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    default: 'Пользователь',
    required: [true, validationMessage.required],
    minlength: [2, validationMessage.minlength],
    maxlength: [30, validationMessage.maxlength],
  },
  email: {
    type: String,
    required: [true, validationMessage.required],
    unique: true,
    validate: {
      validator: (text) => emailRegex.test(text),
      message: validationMessage.email,
    },
  },
  password: {
    type: String,
    required: [true, validationMessage.required],
    select: false,
  },

}, {
  versionKey: false,
});

module.exports = mongoose.model('user', userSchema);
