const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

const validateTournamentInput = require('../../validation/tournamentValidation')

const Tournament = require('../../models/Tournament')
const User = require('../../models/User')


// Route: /api/tournaments

// GET my tournaments - Private
router.get('/:id', passport.authenticate('jwt', {session: false}), (req,res) => {
	
	Tournament.find({
		user: req.params.id
	})
		.then(tournaments => {
			if(tournaments) {
				return res.json({ tournaments: tournaments })
			} else {
				return res.json({ tournaments: [] })
			}
		})
		.catch(err => {
			return res.status(400).json({error: 'Something went wrong.'})
		})
})

// POST create new tournament - Private
router.post('/new', passport.authenticate('jwt', {session: false}), (req,res) => {
	const { body } = req
	const { errors, isValid } = validateTournamentInput(body)

	if(!isValid) {
		return res.status(400).json(errors)
	}

	User.findOne({ _id: body.user })
		.then(user => {
			if(!user) {
				return res.status(400).json({error: 'User does not exists'})
			}
		})
		.catch(err => {
			return res.status(400).json({ error: 'Invalid user' })
		})


	const tournament = new Tournament({
		user: body.user,
		tournamentname: body.tournamentname,
		venue: body.venue,
		startdate: body.startdate,
		enddate: body.enddate,
		format: body.format,
		requested_fields: body.requested_fields,
	})

	tournament.save()
		.then(tournament => {
			return res.json(tournament)
		})
		.catch(err => {
			console.log(err)
		})
})


module.exports = router;