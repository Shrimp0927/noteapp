const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
	googleId: String,
	avatarURL: String,
});

mongoose.model('users', userSchema);
