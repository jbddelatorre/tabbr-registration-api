const express = require('express')
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');

const User = require('../../models/User')


// @POST - /api/account/signup - PUBLIC
//sign up a new account
router.post('/signup', async (req, res) => {
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


// @POST - /api/account/login - PUBLIC
//login in account

router.post('/login', async (req, res) => {
	const { body } = req

	const user = await User.findOne({
		email: body.email,
	})
	if(!user) {
		return res.status(404).json({ error: "Email does not exist." })
	}

	//Check password

	const isMatch = await bcrypt.compare(body.password, user.password)

	if(isMatch) {
		const payload = {
			id: user.id,
			fullname: user.fullname,
			institution: user.institution,
			email: user.email,
			contact: user.contact,
		}

		//sign token
		jwt.sign(
			payload,
			keys.secretOrKey,
			{ expiresIn: 3600 },
			( err, token ) => {
				res.json({
					success:true,
					token: 'Bearer ' + token
				})
			}
		)
	} else {
		return res.status(400).json({ error: "Password is incorrect" })
	}

})


module.exports = router;