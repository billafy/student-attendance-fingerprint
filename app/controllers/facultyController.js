const { Student, Faculty, Subject, Attendance } = require('../db/models');

const login = async (req, res) => {
	const { email, password } = req.body;
	try {
		const faculty = await Faculty.findOne({ where: { email, password } });
		if (!faculty) return res.render('facultyLogin', { error: 'Invalid email or password' });
		req.session.faculty = faculty;
        req.session.save();
		return res.render('facultyHome', { faculty });
	} catch (err) {
		return res.render('facultyLogin', { error: err.errors[0].message });
	}
};

const getStudents = async (req, res) => {
	const faculty = req.session.faculty;
    if(!faculty)
        return res.render('index');
	const students = await Student.findAll({ where: { branch: faculty.branch } });
	res.render('students', { students, faculty });
};

const getStudentAttendance = async (req, res) => {
	const faculty = req.session.faculty;
	const student = await Student.findOne({where: {id: req.params.id}});
    if(!faculty || !student)
        return res.render('index');
	const studentDetail = student.dataValues;
	console.log(studentDetail)
	const subjects = await Subject.findAll({where: {branch: student.branch, semester: student.semester}});
	studentDetail.attendances = [];
	for(let i = 0; i < subjects.length; ++i) {
		const attendances = await Attendance.findAll({where: {student: student.id, subject: subjects[i].id}});
		studentDetail.attendances.push({
			subjectName: subjects[i].name,
			totalLectures: 12,
			totalAttended: attendances.length,
			percentageAttended: Math.round((attendances.length * 100) / 12, 2),
			list: attendances.sort((a, b) => {
				return new Date(a.createdAt) - new Date(b.createdAt);
			}),
		});
	}
	res.render('studentAttendance', {student: studentDetail, faculty});
};


module.exports = { login, getStudents, getStudentAttendance };
