const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const dotenv = require('dotenv').config();

const cors = require('cors');

/*var corsOptions = {
    origin: 'http://localhost',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}*/

const indexRouter = require('./api/v1/routes/index');
const categoriesRouter = require('./api/v1/routes/categories');

const app = express();

app.use(cors());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// main router
app.use('/', indexRouter);

// API v1 path
const api_path_v1 = '/api/v1';

// Categories API v1
app.use(api_path_v1 + '/categories', categoriesRouter);

module.exports = app;
