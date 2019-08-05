const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');

app.use(bodyParser.json());
app.use(express.static(__dirname + '/public/dist/public'));

// require('./server/models/user.js')()
require('./server/configs/routes.js')(app)

