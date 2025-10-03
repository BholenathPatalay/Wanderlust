const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true, trim: true }
});

userSchema.plugin(passportLocalMongoose); // adds username + hash + salt

module.exports = mongoose.model('User', userSchema);
