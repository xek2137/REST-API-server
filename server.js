const express = require('express');
const path = require('path');
const db = require('./db');

const app = express();

app.use(express.urlencoded({extended: false}));
app.use(express.static(path.join()));

app.listen(8000, () => {console.log('Server up on 8000')})