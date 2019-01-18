const mongoose = require('mongoose');
const Schema = mongoose.Schema

const UserSchema = new Schema({
	fullname: {
		type: String,
		required: true
	},
	institution: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true
	},
	contact: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true
	},
})

module.exports = User = mongoose.model('users', UserSchema)