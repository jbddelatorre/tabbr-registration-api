const Validator = require('validator');
const isEmpty = require('./isEmpty')


module.exports = validateRegisterInput = (data) => {
	let errors = {};

	for(let key of Object.keys(data)) {
		if(isEmpty(data[key])) {
			errors[key] = `Field ${key} is required.`
		}
	}

	return {
		errors,
		isValid: isEmpty(errors)
	}
}