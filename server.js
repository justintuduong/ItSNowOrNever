const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');

app.use(bodyParser.json());
app.use(express.static(__dirname + '/public/dist/public'));

// --------------------------------------------------------------------
// Sequelize
// --------------------------------------------------------------------

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

// --------------------------------------------------------------------
// Schemas (can later move to /src/models/{scheme_name.js})
// --------------------------------------------------------------------

const User = sequelize.define("user", {
    first_name: { 
        type: Sequelize.STRING, 
        validate: {
            allowNull: false,   // will not accept a lack of input
            len: [2, 45],       // length is between 2 and 45
            isAlpha: true       // must only contain letters
        }
    },
    last_name: { 
        type: Sequelize.STRING, 
        validate: {
            allowNull: false,
            len: [2, 45],
            isAlpha: true
        },
    },
    username: { 
        type: Sequelize.STRING, 
        validate: {
            allowNull: false,
            len: [2, 45]
        },
    },
    email: { 
        type: Sequelize.STRING, 
        validate: {
            allowNull: false, 
            isEmail: true,      //must match email format
            len: [2, 75]
        },
    },
}, { timestamps : true }); //timestamps produce columns == "createdAt" and "updatedAt"

// -------------------------  EventJoinedSchema --------------------------

// var EventJoinedSchema = new mongoose.Schema({
//     eventTitle: {                             // will be used to pull all messages from one sender
//         type: String,
//         required: [true, "Event must have a title"],
//         minlength: [3, "Title must be at least 3 characters"]
//     },
//     eventId: {
//         type: String,
//         required: true
//     },
//     userId: {
//         type: String,
//         required: true
//     }
//     eventStartDate: {
//         type: Date,
//         required: [true, "Event must have a start date"],
//         min: new Date(),
//     },
//     eventEndDate: {
//         type: Date,
//         required: [true, "Event must have an end date"],
//         min: new Date(),
//     },
//     eventDescription: {
//         type: String,
//         required: [true, "Password is required!"],
//         default: ''
//     },
// }, {
//     timestamps: true
// })
// mongoose.model('event', EventSchema);
// var Event = mongoose.model('event');
// module.exports = { Event }

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