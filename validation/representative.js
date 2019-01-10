const Validator = require('validator');
const isEmpty = require('./isEmpty')

module.exports = validateRegisterInput = (data) => {
	let errors = {};
	const parameters = [
		'institution',
		'representative',
		'email',
		'contact',
		'num_teams',
		'num_adj',
		'num_obs',
	];

	for(let key of parameters) {
		if(key === 'email' && !Validator.isEmail(data[key])) {
			errors[key] = `Provided information is not a valid email.`
		}

		if((key === 'num_teams' || key ==='num_adj' || key ==='num_obs') && isNaN(data[key])) {
			errors[key] = `Provided information is not a valid number.`
		}

		if(isEmpty(data[key])) {
			errors[key] = `Field ${key} is required.`
		}
	}

	return {
		errors,
		isValid: isEmpty(errors)
	}
}