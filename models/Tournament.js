const mongoose = require('mongoose')
const Schema = mongoose.Schema


const TournamentSchema = new Schema({
	user: {
		type: Schema.Types.ObjectId,
		ref: 'users',
		required: true
	},
	tournamentname: {
		type: String,
		required: true
	},
	venue: {
		type: String,
		required: true,
	},
	startdate: {
		type: Date,
		required: true
	},
	enddate: {
		type: Date,
		required: true
	},
	format: {
		type: String,
		required: true,
		minlength: 2,
		maxlength: 2,
		lowercase: true
	},
	requested_fields: {
		type: Array,
		default: []
	}
})


module.exports = Tournament = mongoose.model('tournaments', TournamentSchema);