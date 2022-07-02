const express = require('express');

const authRoutes = require('./routes/auth.routes');

const app = express();

app.use('/auth', authRoutes);

app.listen(3000);
