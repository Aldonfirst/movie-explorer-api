const mongoose = require('mongoose');
const { isEmail } = require('validator');
const { validationMessage } = require('../utils/errorMessage');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, validationMessage.required],
    unique: true,
    validate: {
      validator: (text) => isEmail(text),
      message: validationMessage.email,
    },
  },
  password: {
    type: String,
    required: [true, validationMessage.required],
    select: false,
  },
  name: {
    type: String,
    // default: 'Пользователь',
    required: [true, validationMessage.required],
    minlength: [2, validationMessage.minlength],
    maxlength: [30, validationMessage.maxlength],
  },
}, {
  versionKey: false,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
});

module.exports = mongoose.model('user', userSchema);
