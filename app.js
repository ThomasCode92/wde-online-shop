const path = require('path');

const express = require('express');

const db = require('./data/database');

const authRoutes = require('./routes/auth.routes');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));

app.use('/auth', authRoutes);

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
