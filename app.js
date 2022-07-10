const path = require('path');

const express = require('express');
const expressSession = require('express-session');
const csurf = require('csurf');

const createSessionConfig = require('./config/session');
const addCsrfToken = require('./middleware/csrf-token');
const errorHandler = require('./middleware/error-handler');

const db = require('./data/database');

const authRoutes = require('./routes/auth.routes');

const app = express();

const sessionConfig = createSessionConfig();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));

app.use(expressSession(sessionConfig));

app.use(csurf());
app.use(addCsrfToken);

app.use('/auth', authRoutes);
app.use(errorHandler);

db.connectToDatabase()
  .then(function () {
    app.listen(3000, function () {
      console.log('Server connected to database!');
    });
  })
  .catch(function (error) {
    console.log('Failed to connect to the database!');
    console.log(error);
  });
