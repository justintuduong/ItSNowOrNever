const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const bcrypt = require('bcrypt');
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
        allowNull: false, // will not accept a lack of input
        validate: {
            len: [2, 45], // length is between 2 and 45
            isAlpha: true // must only contain letters
        }
    },
    last_name: {
        type: Sequelize.STRING,
        validate: {
            allowNull: [false, "Must be at least 2 character"],
            len: [2, 45],
            isAlpha: true
        },
    },
    email: { 
        type: Sequelize.STRING, 
        allowNull: false, 
        validate: {
            isEmail: true,      //must match email format
            len: [2, 75],
            msg:"Is not a valid email",
        },
    },
    password: { 
        type: Sequelize.STRING, 
        validate: {
            allowNull: false,
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
const BCRYPT_SALT_ROUNDS = 12;

app.post('/create', (req, res) => {
    console.log('server.js data from form')
    console.log(req.body) //checking form data
       const data = {
            first_name: req.body.first_name, last_name: req.body.last_name, 
            email: req.body.email, 
            password: req.body.password
    };
    if(data.password === ''){
        res.json('password is required')
    }
    User.findOne({
        where: {
            email: data.email
        }
    })
    .then (user => {
        if (user !=null){
            console.log('Email already taken');
            res.json('Email already taken')
            req.flash('email', "Email already exists!")
            res.redirect("/")
        } else{
            bcrypt.hash(data.password, BCRYPT_SALT_ROUNDS)
            .then(function(password) {
                console.log(password);
                User.create({ 
                    first_name: req.body.first_name, last_name: req.body.last_name, 
                    email: req.body.email, 
                    password: req.body.password })
            
                .then(User => {
                    console.log(" user auto-generated ID:", User.id);
                });
            })
        }
    })
    .catch(err => {
        console.log('problem comminicating with the db');
        res.status(500).json(err);
    })
    // User.create({ 
    //     first_name: req.body.first_name, last_name: req.body.last_name, 
    //     email: req.body.email, 
    //     password: req.body.password })

    // .then(User => {
    //     console.log(" user auto-generated ID:", User.id);
    // });
    // .catch(err => {
    //     console.log('couldent create user')
    // })
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