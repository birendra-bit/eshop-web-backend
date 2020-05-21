const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

require('../db').connection

const app = express();

app.use(bodyParser.urlencoded({ extended: true }))

app.use(bodyParser.json())
app.use(cors())
app.options("*", cors())

const { HOST, PORT } = require('./config');
const router = require('../router/router');


router(app)

app.listen(PORT, HOST, err => {
    if (err) throw err;
    console.log(`Running on http:${HOST}:${PORT}`);
});

module.exports = { app }