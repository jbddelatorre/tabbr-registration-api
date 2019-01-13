const express = require('express');
const router = express.Router();

// Load Models
const Representative = require('../../models/Representative');

router.post('/', (req, res) => {
	const { body } = req
	let errors = {}
	Representative.findOne({
		email: body.email,
		registration_code: body.registration_code
	})
		.then(registration => {
			if(!registration) {
				errors.viewregistration = "Registration does not exist."
				return res.status(404).json(errors)
			}
			return res.json(registration)
		})
})

module.exports = router;