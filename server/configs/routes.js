const path = require('path');
const process = require('../controllers/crud.js')

module.exports = function (app) {

    //find all
    app.get('/findAll', (req, res) => {
        process.findAll(req, res);
    });

    // find one by user id
    app.get('/findOneById/:id', (req, res) => {
        process.findOneById(req, res);
    });
    // find one by first name
    app.get('/findOneByName/:friend', (req, res) => { //searches by first name for chat
        process.findOneByName(req, res);
    });

    // create a user
    app.post('/create', (req, res) => {
        process.createUser(req, res);
    });

    // delete a user, still has error (jd)
    app.delete('/delete/:id', (req, res) => {
        process.deleteUser(req, res);
    });

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

    // ----------------------------------------------------------------

    const io = require('socket.io').listen(server);
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

}