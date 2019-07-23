const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');

app.use(bodyParser.json());
app.use(express.static(__dirname + '/public/dist/public'));

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

// Setting our Server to Listen on Port: 8000
app.listen(8000, function () {
    console.log("listening on port 8000");
})


// "axios": "^0.19.0",
//     "bcrypt": "^3.0.6",
//     "body-parser": "^1.19.0",
//     "express": "^4.17.1",
//     "express-flash": "0.0.2",
//     "express-session": "^1.16.2",
//     "mongoose": "^5.6.5",
//     "mysql2": "^1.6.5",
//     "mysql3": "^0.3.1",
//     "path": "^0.12.7",
//     "pg": "^7.11.0",
//     "pg-hstore": "^2.3.3",
//     "sequelize": "^5.10.2",
//     "sequelize-cli": "^5.5.0",
//     "socket.io": "^2.2.0",
//     "ts": "^0.2.2"
