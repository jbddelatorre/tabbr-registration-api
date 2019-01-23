const Validator = require('validator');
const isEmpty = require('./isEmpty')

module.exports = validateTournamentInput = (data) => {
	let errors = {};
	const parameters = [
		'user',
		'tournamentname',
		'venue',
		'startdate',
		'enddate',
		'format',
		'requested_fields'
	];

	// for(let key of parameters) {
	// 	if(key === 'startdate' || key === 'enddatedate') {
	// 		if(typeof data[key] != Date) {
	// 			errors[key] = `Provided information is not a valid date.`
	// 		}
	// 	}

	// 	if(key === 'requested_fields' && (!data['requested_fields'] || !Array.isArray(data['requested_fields']))) {
	// 		errors[key] = `This is not a valid set of requested fields.`
	// 	}

	// 	if(key === 'format' && (!data['format'] || data[key].length !== 2)) {
	// 		errors[key] = `This is not a valid format.`
	// 	}

	// 	if(isEmpty(data[key]) && key !== 'requested_fields') {
	// 		errors[key] = `Field ${key} is required.`
	// 	}
	// }

	return {
		errors,
		isValid: isEmpty(errors)
	}
}