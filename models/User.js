const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const emailRegex = require('../utils/emailRegex');

const UserSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, 'Please provide a name'],
		minLength: 3,
		maxLength: 50,
	},
	email: {
		type: String,
		required: [true, 'Please provide an email'],
		match: [emailRegex, 'Please provide a valid email'],
		unique: true,
	},
	password: {
		type: String,
		required: [true, 'Please provide a password'],
		minLength: 6,
	},
});

UserSchema.pre('save', async function () {
	const salt = await bcrypt.genSalt(10);
	this.password = await bcrypt.hash(this.password, salt);
});

module.exports = mongoose.model('User', UserSchema);
