// module.exports = (sequelize, Sequelize) => {
//     const User = sequelize.define("user", {
//         first_name: {
//             type: Sequelize.STRING,
//             allowNull: false, // will not accept a lack of input
//             validate: {
//                 len: [2, 45], // length is between 2 and 45
//                 isAlpha: true // must only contain letters
//             }
//         },
//         last_name: {
//             type: Sequelize.STRING,
//             validate: {
//                 allowNull: [false, "Must be at least 2 character"],
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
//                 allowNull: false,
//                 len: [2, 45]
//             },
//         },
//     }, {
//         timestamps: true
//     }); //timestamps produce columns == "createdAt" and "updatedAt"
//     return User;
//     }

// db.sequelize = sequelize;
// db.Sequelize = Sequelize;

// module.exports = db;
