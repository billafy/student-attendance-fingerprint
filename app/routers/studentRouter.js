const { register, markAttendance } = require('../controllers/studentController');
const { Router } = require('express');

const router = Router();

router.get('/register', (req, res) => res.render('studentRegister'));

router.post('/register', register);
router.post('/markAttendance', markAttendance);

module.exports = router;
