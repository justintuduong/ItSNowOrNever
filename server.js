const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const Sequelize = require('sequelize');
const sequelize = new Sequelize('snow', 'root', 'hello', {
    host: 'localhost',
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
      }
  });

app.use(bodyParser.json());
app.use(express.static(__dirname + '/public/dist/public'));

// --------------------------------------------------------------------
// Sequelize
// --------------------------------------------------------------------

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

const User = sequelize.define("user", {
    first_name: { 
        type: Sequelize.STRING, 
        validate: {
            // allowNull: [false, "Must be at least 2 character"],   // will not accept a lack of input
            len: [2, 45],       // length is between 2 and 45
            isAlpha: true       // must only contain letters
        }
    },
    last_name: { 
        type: Sequelize.STRING, 
        validate: {
            // allowNull: [false, "Must be at least 2 character"],
            len: [2, 45],
            isAlpha: true
        },
    },
    email: { 
        type: Sequelize.STRING, 
        validate: {
            // allowNull:[false, "Not a valid email"],
            isEmail: true,      //must match email format
            len: [2, 75]
        },
    },
    password: { 
        type: Sequelize.STRING, 
        validate: {
            // allowNull:[false, "Must be at least 8 characters long"],     
            len: [8, 255]
        },
    },
}, { timestamps : true }); //timestamps produce columns == "createdAt" and "updatedAt"

// --------------------------------------------------------------------
// Routes
// --------------------------------------------------------------------

// Get all users

app.get('/all', (req, res) => {
    console.log("Got home page .get")
    User.findAll()
        .then(users => {
            console.log("got all users")
            res.json({users})
        })
        .catch( err => {
            console.log('something went wrong')
        })
});

// create a user
app.post('/create', (req, res) => {
    console.log('server.js')
    console.log(req.body) //checking form data
    User.create({ firstName: req.body.first_name, last_name: req.body.last_name, email: req.body.email, password: req.body.password })
    .then(users => {
        console.log(" user auto-generated ID:", data.id);
    });
    .catch( err => {
        console.log('something went wrong')
    });
})



// --------------------------------------------------------------------
// Redirects, listen, and 404
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