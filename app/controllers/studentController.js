const{ Student } = require('../db/models');

const register = async (req, res) => {
	const {
		name,
		email,
		gender,
		id,
		branch,
		semester,
		dateOfBirth,
		fingerprint,
	} = req.body;
    try {
    	await Student.create({
    		name: name || null,
    		email: email || null,
    		gender: gender || null,
    		id: id || null,
    		branch: branch || null,
    		semester: semester || null,
    		dateOfBirth: dateOfBirth || null,
    		fingerprint: fingerprint || null,
    	});
    } catch (err) {
		return res.render('studentRegister', {error: err.errors[0].message});
    }
	res.render('index');
};

const markAttendance = (req, res) => {};

module.exports = { register, markAttendance };
