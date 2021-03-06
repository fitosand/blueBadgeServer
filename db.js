//import the sequilize package
const Sequelize = require('sequelize');
require('dotenv').config();

//create a new instance of Sequelize, connecting us to a database
const database = new Sequelize(process.env.DATABASE_URL, {
    // host: 'localhost',
    dialect: 'postgres'
});

database.authenticate()
    .then(() => console.log('postgres db is connected'))
    .catch(err => console.log(err));

module.exports = database;