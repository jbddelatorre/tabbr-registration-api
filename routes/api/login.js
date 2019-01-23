const express = require('express')
const router = express.Router();
const bcrypt = require('bcryptjs');

const User = require('../../models/User')

router.post('/', async (req, res) => {
	const { body } = req

	try {
		const user = await User.findOne({
			email: body.email
		})

		if(user) return res.status(400).json({error: "Email already used."})

		const newUser = new User({
				fullname: body.fullname,
				institution: body.institution,
				email: body.email,
				contact: body.contact,
				password: body.password
			})

			bcrypt.genSalt(10, (err, salt) => {
				bcrypt.hash(newUser.password, salt, async (err, hash) => {
					if(err) throw err;
					newUser.password = hash;
						try {
							const user = await newUser.save()
							return res.json({ success: "Successfully created" })
						}
						catch(err) {
							return res.status(400).json({error: "Invalid Inputs"})
						}
				})
			})
		
	} 
	catch(err) {
		console.log(err)
		return res.status(500).json({error: "Something went wrong"})
	}
})

module.exports = router;