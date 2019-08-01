const express = require('express');
const app = express();
const session = require('express-session');
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
app.use(session({
    secret: 'GET IN MAH BELLY!',
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 60000
    }
}))

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
            // allowNull: false, // will not accept a lack of input
            len: [2, 45], // length is between 2 and 45
            isAlpha: true // must only contain letters
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
            // allowNull: false, 
            isEmail: true, //must match email format
            len: [2, 75]
        },
    },
    image_url: {
        type: Sequelize.STRING,
            defaultValue: 'https://clearhillscounty.ab.ca/wp-content/uploads/2016/11/photo-not-available-250x300.jpg',
    },
    password: {
        type: Sequelize.STRING,
        validate: {
            // allowNull: false,
            len: [2, 45]
        },
    },
}, {
    timestamps: true
}); //timestamps produce columns == "createdAt" and "updatedAt"

// --------------------------------------------------------------------
// Routes
// --------------------------------------------------------------------

// Get all users
app.get('/all', (req, res) => {
    User.findAll()
        .then(users => {
            console.log("Successfully found all users")
            res.json({
                users
            })
        })
        .catch(err => {
            console.log('something went wrong')
        });
});

// find one user
app.get('/findOne/:id', (req, res) => {
    User.findAll({
            where: {
                id: req.params.id
            }
        })
        .then(users => {
            console.log("Succesfully found user")
            res.json({
                users
            })
        })
        .catch(err => {
            console.log('something went wrong')
        });
});

// create a user
app.post('/create', (req, res) => {
    console.log(req.body) //checking form data
    User.create({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            password: req.body.password
        })
        .then(User => {
            console.log("user auto-generated ID:", User.id);
            req.session.name = User.first_name;
            req.session.id = User.id;
            req.session.active = true;
        });
})

// update user
app.put('/update', (req, res) => {
    console.log(req.body);
    User.create({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        image_url: req.body.image_url,
    })
    // .then(User => {
    //     console.log("user auto-generated ID:", User.id);
    //     req.session.name = User.first_name;
    //     req.session.id = User.id;
    //     req.session.active = true;
    // });
})

// delete a user
app.delete('/delete/:id', (req, res) => {
    let userId = req.params.id
    User.destroy({
        where: {
            id: userId
        }
        .then(users => {
            console.log("Successfully deleted user")
            res.json({
                users
            })
        })
        .catch(err => {
            console.log('something went wrong')
        })
    });
})



// --------------------------------------------------------------------
// Redirects, listen, and 404
// --------------------------------------------------------------------

app.all("*", (req, res, next) => {
    res.sendFile(path.resolve("./public/dist/public/index.html"))
});

// Setting our Server to Listen on Port: 8000
var server = app.listen(8000, function () {
    console.log("listening on port 8000");
})

// The 404 Route (ALWAYS Keep this as the last route)
app.get('*', function (request, response) {
    response.send("404")
});

// --------------------------------------------------------------------
// Socket io
// --------------------------------------------------------------------
const io = require('socket.io').listen(server);

// ---------------------------TESTING-----------------------------------------
// var socket = io('http://192.168.1.217:8000');
// var socket = io.connect("http://[192.168.1.217]:8000");
// io.set('origins', '*:*');
// io.origins('*:*')

// import express from "express";
// import http from "http";

// const app = express();
// const server = http.createServer(app);

// const io = require("socket.io")(server, {
//     handlePreflightRequest: (req, res) => {
//         const headers = {
//             "Access-Control-Allow-Headers": "Content-Type, Authorization",
//             "Access-Control-Allow-Origin": req.headers.origin, //or the specific origin you want to give access to,
//             "Access-Control-Allow-Credentials": true
//         };
//         res.writeHead(200, headers);
//         res.end();
//     }
// });

// io.on("connection", () => {
//     console.log("Connected!");
// });

// --------------------------------------------------------------------

const cors = require('cors');
app.use(cors());

io.on('connection', (socket) => {
    console.log('Client/socket is connected!');
    console.log('Client/socket id is: ', socket.id);
    // join room
    socket.on('join', function (data) {
        // joining
        socket.join(data.room)
        console.log(data.user + 'joined the room: ' + data.room);
        // broadcast sends msg to everyone, except ones self
        socket.broadcast.to(data.room).emit('new user joined', {
            user: data.user,
            message: 'has joined this room.'
        })
    });
    // leave room
    socket.on('leave', function (data) {
        console.log('leaving connection.');
        console.log(data.user + ' leaving the room: ' + data.room);
        // broadcast sends msg to everyone, except ones self
        socket.broadcast.to(data.room).emit('left room', {
            user: data.user,
            message: 'has left this room.'
        })
        socket.leave(data.room)
    });
    // send message
    socket.on('message', function (data) {
        console.log('sending message');
        io.in(data.room).emit('new message', {
            user: data.user,
            message: data.message
        });
    });
});