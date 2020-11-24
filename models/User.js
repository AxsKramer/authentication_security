const mongoose = require('mongoose');
const encrypt = require('mongoose-encryption');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    trim: true
  }
});

//Mongoose encrypt the password when post user password to db
//and unencrypt when we use find() function in the model

const secret = 'Thisisoursecret';
userSchema.plugin(encrypt, {secret: secret, encryptedFields: ['password'] });

module.exports = new mongoose.model('User', userSchema);
