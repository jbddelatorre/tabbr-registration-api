const mongoose = require('mongoose');
const Schema = mongoose.Schema

// Create Schema
const RepresentativeSchema = new Schema({
	institution: {
		type: String,
		required: true
	},
	representative: {
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
	num_teams: {
		type: Number,
		required: true
	},
	num_adj: {
		type: Number,
		required: true
	},
	num_obs: {
		type: Number,
		required: true
	},
	registration_code: {
		type: String,
	}	
});

module.exports = Representative = mongoose.model('representatives', RepresentativeSchema);