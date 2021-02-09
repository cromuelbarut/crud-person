const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');

// model
const Person = require('../model/Person');

//@route       GET /api/person
//@desc        Get all person
//@access      Public
router.get('/', async (req, res) => {
	try {
		const people = await Person.find().sort({ date: -1 });

		res.json({
			success: true,
			data: people
		});
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server error');
	}
});

//@route       GET /api/person/:id
//@desc        Get person with id
//@access      Public
// router.get('/:id', async (req, res) => {
// 	try {
// 		const person = await Person.findById(req.params.id);

// 		if (!person) {
// 			return res
// 				.status(404)
// 				.json({ success: false, errors: [{ msg: 'Person not found' }] });
// 		}

// 		res.json({ success: true, data: person });
// 	} catch (err) {
// 		if (err.kind === 'ObjectId') {
// 			return res
// 				.status(404)
// 				.json({ success: false, errors: [{ msg: 'Person not found' }] });
// 		}

// 		console.error(err.message);
// 		res.status(500).send('Server error');
// 	}
// });

//@route       POST /api/person
//@desc        Create person
//@access      Public
router.post(
	'/',
	[
		body(
			'firstname',
			'Firstname must be atleast 3 characters long'
		).isLength({ min: 3 }),
		body('lastname', 'Lastname must be atleast 3 characters long').isLength({
			min: 3
		}),
		body('age', 'Age is required').not().isEmpty(),
		body('address', 'Address is required').not().isEmpty()
	],
	async (req, res) => {
		// validate inputs
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res
				.status(400)
				.json({ success: false, errors: errors.array() });
		}

		try {
			const { firstname, lastname, age, address } = req.body;

			const person = new Person({ firstname, lastname, age, address });

			await person.save();

			res.json({ success: true, data: person });
		} catch (err) {
			console.error(err.message);
			res.status(500).send('Server error');
		}
	}
);

//@route       DELETE /api/person/:id
//@desc        Delete person with id
//@access      Public
router.delete('/:id', async (req, res) => {
	try {
		const person = await Person.findById(req.params.id);
		if (!person) {
			return res
				.status(404)
				.json({ sucess: false, errors: [{ msg: 'Person not found' }] });
		}

		await Person.findByIdAndRemove(req.params.id);

		res.json({ success: true, msg: 'Person deleted successfully' });
	} catch (err) {
		if (err.kind === 'ObjectId') {
			return res
				.status(404)
				.json({ success: false, errors: [{ msg: 'Person not found' }] });
		}

		console.error(err.message);
		res.status(500).send('Server error');
	}
});

//@route       PUT /api/person/:id
//@desc        Update person with id
//@access      Public
router.put(
	'/:id',
	[
		body(
			'firstname',
			'Firstname must be atleast 3 characters long'
		).isLength({ min: 3 }),
		body('lastname', 'Lastname must be atleast 3 characters long').isLength({
			min: 3
		}),
		body('age', 'Age is required').not().isEmpty(),
		body('address', 'Address is required').not().isEmpty()
	],
	async (req, res) => {
		// validate inputs
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res
				.status(400)
				.json({ success: false, errors: errors.array() });
		}

		try {
			let person = await Person.findById(req.params.id);
			if (!person) {
				return res
					.status(404)
					.json({ sucess: false, errors: [{ msg: 'Person not found' }] });
			}

			const { firstname, lastname, age, address } = req.body;

			const personFields = {};
			personFields.firstname = firstname;
			personFields.lastname = lastname;
			personFields.age = age;
			personFields.address = address;

			person = await Person.findByIdAndUpdate(
				req.params.id,
				{
					$set: personFields
				},
				{ new: true }
			);

			res.json({
				success: true,
				msg: 'Person updated successfully',
				data: person
			});
		} catch (err) {
			if (err.kind === 'ObjectId') {
				return res
					.status(404)
					.json({ success: false, errors: [{ msg: 'Person not found' }] });
			}

			console.error(err.message);
			res.status(500).send('Server error');
		}
	}
);

module.exports = router;
