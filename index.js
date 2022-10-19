const express = require('express');
const path = require('path');
const bodyParser = require('body-parser')
const hbs = require('hbs');
const session = require('express-session');

const studentRouter = require('./app/routers/studentRouter');
const facultyRouter = require('./app/routers/facultyRouter');

require('./app/db/models');

const app = express();
const port = process.env.PORT || 3000;

const static_path = path.join(__dirname, './public');
const template_path = path.join(__dirname, './templates/views');
const partial_path = path.join(__dirname, './templates/partials');

app.use(bodyParser.urlencoded({ extended: false }))

app.use(session({
  secret: 'iot',
  cookie: { }
}))

app.use(express.static(static_path));
app.set('view engine', 'hbs');
app.set('views', template_path);

hbs.registerPartials(partial_path);
hbs.registerHelper('dateFormat', require('handlebars-dateformat'));

app.use('/student', studentRouter);
app.use('/faculty', facultyRouter);

app.get('/', (req, res) => res.render('index'));

app.listen(port, () => console.log(`Server is running at port ${port}`));
