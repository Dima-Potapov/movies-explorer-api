const { Schema, model } = require('mongoose');
const isEmail = require('validator/lib/isEmail');

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  email: {
    type: String,
    unique: true,
    validator: {
      validator: (v) => isEmail(v),
      message: 'Неправильный формат Email',
    },
    required: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
});

module.exports = model('user', userSchema);
