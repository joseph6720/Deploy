const express = require('express');
const router = express.Router();
const Joi = require('joi');
const courses = [ { id: 0, name: 'course1' }, { id: 1, name: 'course2' }, { id: 2, name: 'course3' } ];

router.get('/', (req, res) => {
	res.send(courses);
});

router.get('/:id', (req, res) => {
	const course = courses.find((c) => {
		return c.id === parseInt(req.params.id);
	});
	if (!course) return res.status(404).send('Couldnt find a course with that id'); //So that execution stops on that error
	res.send(course);
});

router.post('/', (req, res) => {
	//Validate the input
	const { error } = validateCourse(req.body); //returns error and value object

	if (error) return res.status(400).send(error.details[0].message);

	const course = {
		id   : courses.length,
		name : req.body.name
	};
	courses.push(course);
	res.send(course);
});

router.put('/:id', (req, res) => {
	const course = courses.find((c) => {
		return c.id === parseInt(req.params.id);
	});

	if (!course) return res.status(404).send('The course does not exist');

	const { error } = validateCourse(req.body);

	if (error) return res.status(400).send(error.details[0].message);
	course.name = req.body.name;

	res.send(course);
});

router.delete('/:id', (req, res) => {
	const course = courses.find((c) => {
		return c.id === parseInt(req.params.id);
	});

	if (!course) return res.status(404).send('The course does not exist');
	const index = courses.indexOf(course);
	courses.splice(index, 1);

	res.send(`Removed ${JSON.stringify(course)}`);
});

function validateCourse (course) {
	const schema = Joi.object({
		name : Joi.string().min(3).required()
	}); //Defining the validation schema

	return schema.validate(course);
}

module.exports = router;
