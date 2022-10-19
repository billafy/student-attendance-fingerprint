const { login, getStudents, getStudentAttendance } = require('../controllers/facultyController');
const { Router } = require('express');

const router = Router();

router.get('/login', (req, res) => {
    if(req.session.faculty)
        return res.render('facultyHome', {faculty: req.session.faculty});
    res.render('facultyLogin')
});
router.get('/getStudents', getStudents);
router.get('/getStudentAttendance/:id', getStudentAttendance)


router.post('/login', login);
router.get('/logout',(req,res)=>{
       req.session.destroy();
       res.render('index')
})


module.exports = router;
