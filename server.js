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

const User = sequelize.define("user", {
    first_name: { type: Sequelize.STRING, allowNull: false },
    last_name: { type: Sequelize.STRING, allowNull: false }
    }, { timestamps : true});

// --------------------------------------------------------------------
// Routes
// --------------------------------------------------------------------

app.route('/users/all', (req, res) => {
    User.findAll()
    .then( users => {
        console.log("got all users")
        res.json({users})
    })
    .catch( err => {
        console.log('something went wrong')
    })
})

app.all("*", (req, res, next) => {
    res.sendFile(path.resolve("./public/dist/public/index.html"))
});


// --------------------------------------------------------------------
// Restful Routes
// --------------------------------------------------------------------

app.get('/allUsers', (res) => {
    User.find().then(data, err => {
        console.log("This works")
        if (err) {
            res.json({
                message: "Error",
                error: err
            })
        } else {
            res.json({
                message: "Successfully found author", 
                data: data
            })
        }
    })
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