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

app.use(bodyParser.urlencoded({
    extended: true
}));

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




// -------------------------  EventHostedSchema --------------------------

// var EventSchema = new mongoose.Schema({
//     eventTitle: {                             // will be used to pull all messages from one sender
//         type: String,
//         required: [true, "Event must have a title"],
//         minlength: [3, "Title must be at least 3 characters"]
//     },
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
//     usersJoined: [EventJoinedSchema],                        // will be used for group messaging in future
// }, {
//     timestamps: true
// })
// mongoose.model('event', EventSchema);
// var Event = mongoose.model('event');
// module.exports = { Event }

// -------------------------  MessageSchema --------------------------

// var MessageSchema = new mongoose.Schema({
//     senderId: {                             // will be used to pull all messages from one sender
//         type: String,
//         required: true,
//     },
//     content: {
//         type: String,
//         required: true,
//     },
//     password: {
//         type: String,
//         required: [true, "Password is required!"],
//         minlength: [6, "Name must be at least 2 characters"]
//     },
//     // recipients: [],                      // will be used for group messaging in future
// }, {
//     timestamps: true
// })
// mongoose.model('message', MessageSchema);
// var Message = mongoose.model('message');
// module.exports = { Message }

// -------------------------  UserSchema --------------------------

// var UserSchema = new mongoose.Schema({
//     firstName: {
//         type: String,
//         required: [true, "First name is required!"],
//         minlength: [2, "Name must be at least 2 characters"]
//     },
//     lastName: {
//         type: String,
//         required: [true, "Last name is required!"],
//         minlength: [2, "Name must be at least 2 characters"]
//     },
//     email: {
//         type: String,
//         required: [true, "Email is required!"],
//         minlength: [2, "Name must be at least 2 characters"]
//     },
//     password: {
//         type: String,
//         required: [true, "Password is required!"],
//         minlength: [6, "Name must be at least 2 characters"]
//     },
//     permission: {
//         type: Number,
//         default: 1,
//     },
//     // wallposts: [],
//     friends: [],
//     eventsHosted: [EventSchema],
//     eventsJoined: [],
//     messages: [MessageSchema],
// }, {
//     timestamps: true
// })
// mongoose.model('user', UserSchema);
// var User = mongoose.model('user');
// module.exports = { User }

// --------------------------------------------------------------------
// Routes
// --------------------------------------------------------------------

// app.get('/author', (req, res) => {
//     Author.find({}, function (err, data) {
//         if (err) {
//             console.log("Returned error", err);
//             for (var key in err.errors) {
//                 req.flash('reg', err.errors[key].message)
//             }
//             res.json({
//                 message: "Error",
//                 error: err
//             })
//         } else {
//             res.json({
//                 message: "Successfully found all authors",
//                 data: data
//             })
//         }
//     })
// })

// app.post('/author', (req, res) => {
//     Author.create(req.body, (err, data) => {
//         if (err) {
//             res.json({
//                 message: "Error",
//                 error: err
//             });
//         } else {
//             res.json({
//                 message: "Successfully created author"
//             })
//         }
//     })
// })


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

// app.put("/author/:id", (req, res) => {
//     Author.findOneAndUpdate({_id: req.params.id}, req.body,{runValidators: true, new: true}, (err, data) => {
//         if (err) {
//             res.json({
//                 message: "Error",
//                 error: err
//             });
//         } else {
//             res.json({
//                 message: "Successfully updated author",
//                 data: data
//             })
//         }
//     })
// })

// app.delete('/author/:id', (req, res) => {
//     author.deleteOne({_id: req.params.id}, (err) => {
//         if (err) {
//             console.log("one to many is not working")
//             res.json({message: "Error", error: err})
//         } else {
//             res.json({message: "Success"})
//         }
//     })
// })


// // 1 to many relationship

// app.put('/review/:id', (req, res) => {
//     Review.create(req.body, (err, data) => {
//         if (err) {
//             console.log("Error creating")
//             res.json({message: "Error", error: err})
//         } else {
//             Cake.findOneAndUpdate({_id: req.params.id}, {$push: {reviews: data}}, (err, data) => {
//                 if (err) {
//                     console.log("Error updating")
//                     res.json({message: "Error", error: err})
//                 } else {
//                     console.log(data)
//                     res.json({message: "Successfully created and updated!",data: data})
//                 }
//             })
//         }
//     })
// })

// --------------------------------------------------------------------
// Angular routes, 404, and app.listen 
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

