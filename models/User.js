const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new Schema({
  email: {
    type: String,
    trim: true,
    unique: true
  },
  password: {
    type: String,
    trim: true
  }
});

//passportLocalMongoose is what we're going to use to hash and salt 
//our paswords an to save our users into mongo db
userSchema.plugin(passportLocalMongoose);

module.exports = new mongoose.model('User', userSchema);
