const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const variables = require('../bin/configuration/variables');


const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//Config MongoDB
mongoose.connect(variables.database.connection, { useNewUrlParser: true });
mongoose.set('useCreateIndex', true);

//Config Route
module.exports = app;