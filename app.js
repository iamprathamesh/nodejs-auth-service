const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const appProperties = require('./properties');
const loginRouter = require('./src/routes/auth-route');

const app = express();

app.use(morgan(appProperties.morganType));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

mongoose.connect(appProperties.mongoDBUrl, { useNewUrlParser: true, useUnifiedTopology: true });

app.use('/auth', loginRouter);

module.exports = app;