const express = require('express');
const app = express();
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');
const flash = require('express-flash');
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '/static')));
app.set('views', path.join(__dirname, '/views'));
app.use(flash());
app.use(express.static(__dirname + '/public/dist/public'));
app.use(session({
    secret: 'GET IN MAH BELLY!',
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 60000
    }
}))
app.use(bodyParser.urlencoded({
    extended: true
}));



// --------------------------------------------------------------------
// Sequelize
// --------------------------------------------------------------------

const Sequelize = require('sequelize');

// Option 1: Passing parameters separately
const sequelize = new Sequelize('database', 'root', 'root', {
  host: 'localhost',
  dialect: 'mysql'
});


sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

// --------------------------------------------------------------------
// Routes
// --------------------------------------------------------------------






// --------------------------------------------------------------------
// 
// --------------------------------------------------------------------


app.all("*", (req, res, next) => {
    res.sendFile(path.resolve("./public/dist/public/index.html"))
});

// Setting our Server to Listen on Port: 8000
app.listen(8000, function () {
    console.log("listening on port 8000");
})

// The 404 Route (ALWAYS Keep this as the last route)
app.get('*', function (request, response) {
    response.send("404")
});