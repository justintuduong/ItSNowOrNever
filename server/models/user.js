// const Sequelize = require('sequelize');
// const sequelize = new Sequelize('snow', 'root', 'hello', {
//     host: 'localhost',
//     dialect: 'mysql',
//     pool: {
//         max: 5,
//         min: 0,
//         acquire: 30000,
//         idle: 10000
//     }
// });

// // module.exports = 

// sequelize
//     .authenticate()
//     .then(() => {
//         console.log('Connection has been established successfully.');
//     })
//     .catch(err => {
//         console.error('Unable to connect to the database:', err);
//     });

// module.exports = function (sequelize, DataTypes){
//     User = sequelize.define('Users', {
//         first_name: {
//             type: Sequelize.STRING,
//             validate: {
//                 // allowNull: false, // will not accept a lack of input
//                 len: [2, 45], // length is between 2 and 45
//                 isAlpha: true // must only contain letters
//             }
//         },
//         last_name: {
//             type: Sequelize.STRING,
//             validate: {
//                 // allowNull: [false, "Must be at least 2 character"],
//                 len: [2, 45],
//                 isAlpha: true
//             },
//         },
//         email: {
//             type: Sequelize.STRING,
//             validate: {
//                 // allowNull: false, 
//                 isEmail: true, //must match email format
//                 len: [2, 75]
//             },
//         },
//         image_url: {
//             type: Sequelize.STRING,
//             defaultValue: 'https://clearhillscounty.ab.ca/wp-content/uploads/2016/11/photo-not-available-250x300.jpg',
//         },
//         password: {
//             type: Sequelize.STRING,
//             validate: {
//                 // allowNull: false,
//                 len: [2, 45]
//             },
//         },
//     }, {
//         timestamps: true
//     });
// };

