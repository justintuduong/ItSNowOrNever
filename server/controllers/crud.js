require
module.exports = {
    findAll: function (req, res) {
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
    },

    findOneById: function (req, res) {
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
                console.log('something went wrong')
            });
    },
    findOneByName: function (req, res) {
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
    },

    createUser: function (req, res) {
        console.log(req.body) //checking form data
        User.create({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            password: req.body.password
        })
    },
    deleteUser: function (req, res) {
        let userId = req.params.id
        User.destroy({
            where: {
                id: userId
            }
        });
    },
}

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
});