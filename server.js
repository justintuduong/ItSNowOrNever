const express = require('express');
const app = express();

const bodyParser = require('body-parser');
const path = require('path');
// const bcrypt = require('bcrypt');
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
//data base trial
// var db = require("./models");
// const db = {};

// db.Sequelize = Sequelize;
// db.sequelize = sequelize;

// db.friend = require('../model/friend.model.js')(sequelize, Sequelize);
// db.user = require('../model/user.model.js')(sequelize, Sequelize);

// db.friend.belongsToMany(db.user, { as: 'Friends', through: 'friends_list', foreignKey: 'friendId', otherKey: 'userId'});

// db.user.belongsToMany(db.friend, { as: 'user', through: 'friends_list', foreignKey: 'userId', otherKey: 'friendId'});

// module.exports = db;

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

// const Friend = sequelize.define("friend", {

// })
// module.exports = (sequelize, Sequelize) => {
const User = sequelize.define("user", {
    first_name: {
        type: Sequelize.STRING,
        // allowNull: false, // will not accept a lack of input
        validate: {
            len: [2, 45], // length is between 2 and 45
            isAlpha: true // must only contain letters
        }
    },
    last_name: {
        type: Sequelize.STRING,
        validate: {
            // notNull: [true, "Must be at least 2 character"],
            len: [2, 45, "hahaha you have an error"],
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
        defaultValue: 'https://clearhillscounty.ab.ca/wp-content/uploads/2016/11/photo-not-available-250x300.jp4',
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

}); 

// --------------------------------------------------------------------
// Routes
// --------------------------------------------------------------------

// Get all users
app.get('/findAll', (req, res) => {
    User.findAll()
        .then(users => {
            console.log("Successfully found all users")
            res.json({
                users
            })
        })
        .catch(err => {
            console.log('couldent find all users')
        });
});

// find one user
app.get('/findOneById/:id', (req, res) => {
    User.findOne({
            where: {
                id: req.params.id
            }
        })
        .then(data => {
            console.log("Succesfully found user")
            res.json({
                data
            })
        })
        .catch(err => {
            console.log(err);
            console.log('Error finding user')
        });
});

app.get('/findOneByName/:friend', (req, res) => { //searches by first name for chat
    console.log(req.params.friend);
    User.findOne({
            where: {
                first_name: req.params.friend
            }
        })
        .then(data => {
            console.log(data);
            console.log("Succesfully found user")
            res.json({
                data
            })
        })
        .catch(err => {
            console.log('something went wrong')
        });
});

app.post('/create', (req, res) => {
    User.create({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            password: req.body.password
        })

        .then(data => {
            console.log(" user auto-generated ID:", data.id);
            // res.json(user.id);
            res.json({
                data
            })
        })
        .catch(err => {
            console.log('couldent create user')
            console.log(err);
        })
});

// })

// delete a user
app.delete('/delete/:id', (req, res) => {
    let userId = req.params.id
    User.destroy({
        where: {
            id: userId
        }
        // error with the .then function.
        // .then(users => {
        //     console.log("Succesfully found user");
        //     res.json({
        //         users
        //     })
        // })
        // .catch(err => {
        //     console.log('something went wrong');
        // })
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