const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');
const findOrCreate = require('mongoose-findorcreate');

const userSchema = new Schema({
  email: String,
  password: String,
  googleId: String,
  secret: String
});

//passportLocalMongoose is what we're going to use to hash and salt 
//our paswords an to save our users into mongo db
userSchema.plugin(passportLocalMongoose);
userSchema.plugin(findOrCreate);

module.exports = new mongoose.model('User', userSchema);
