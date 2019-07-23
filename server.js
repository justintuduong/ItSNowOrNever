const express = require('express');
const app = express();
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');
const flash = require('express-flash');
<<<<<<< HEAD

=======
>>>>>>> 527234cf73239375530860d39523d3cdbf449beb
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
<<<<<<< HEAD

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

=======
>>>>>>> 527234cf73239375530860d39523d3cdbf449beb
app.use(bodyParser.urlencoded({
    extended: true
}));

<<<<<<< HEAD
// --------------------------------------------------------------------
// Schemas (can later move to /src/models/{scheme_name.js})
// --------------------------------------------------------------------




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
=======
>>>>>>> 527234cf73239375530860d39523d3cdbf449beb


// --------------------------------------------------------------------
// Sequelize
// --------------------------------------------------------------------

// const Sequelize = require('sequelize');

// const sequelize = new Sequelize({
//     dialect: 'sqlite',
//     storage: 'path/to/database.sqlite'
// });

// sequelize
//     .authenticate()
//     .then(() => {
//         console.log('Connection has been established successfully.');
//     })
//     .catch(err => {
//         console.error('Unable to connect to the database:', err);
//     });

// --------------------------------------------------------------------
// Routes
// --------------------------------------------------------------------



<<<<<<< HEAD
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
=======
>>>>>>> 527234cf73239375530860d39523d3cdbf449beb



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