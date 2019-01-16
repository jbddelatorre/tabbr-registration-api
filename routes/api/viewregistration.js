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

router.post('/update', (req, res) => {
	const { body } = req

	console.log(body)
	Representative.findOne({ 
		email: body.email,
		registration_code: body.registration_code
	})
		.then(rep => {
			const fields = Object.keys(rep.toJSON())
			if(fields.includes(body.field)) {
				return Promise.resolve(rep)
			}
			else return res.status(404).json({errors: "Invalid field input"})
		})
		.then(rep => {
			if(rep) {
				Representative.findOneAndUpdate(
					{
						email: body.email,
						registration_code: body.registration_code
					},
					{
						$set: {
							[body.field]: body.value,
						}
					},
					{
						new: true
					}
				)
					.then(up => res.json(up))

			} else {
				return res.status(404).json({errors: "Registration not found"})
			}
		})
		.catch(err => res.status(404).json(err))


})

module.exports = router;