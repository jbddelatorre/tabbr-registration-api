const express = require('express');
const router = express.Router();
const createRegistrationNumber = require('../helper/createRegistrationNumber');

//Load Validation
const validateRepresentativeInput = require('../../validation/representative');

// Load Models
const Representative = require('../../models/Representative');

router.get('/test', (req, res) => res.json({msg: 'Successs rep'}));


// @POST
// @Register Representative
// @Public
router.post('/register', (req, res) => {
	const { errors, isValid } = validateRepresentativeInput(req.body);
	// Check Validation
	if(!isValid) {
		return res.status(400).json(errors);
	}

	const registrationNumber = createRegistrationNumber();
	const newRep = new Representative({
		institution: req.body.institution, 
		representative: req.body.representative, 
		email: req.body.email, 
		contact: req.body.contact, 
		num_teams: req.body.num_teams, 
		num_adj: req.body.num_adj, 
		num_obs: req.body.num_obs,
		registration_code: registrationNumber, 
	})

	newRep.save()
		.then(rep => res.json(rep))
		.catch(err => console.log(err))
})

module.exports = router;