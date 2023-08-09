// const mysql = require('mysql2');

// const pool = mysql.createPool({
//     host : 'localhost',
//     user : 'root',
//     database : 'node-complete',
//     password : 'RAVI8271ravi@'
// });

// module.exports = pool.promise();
const Sequelize = require('sequelize');

const sequelize = new Sequelize('node-complete', 'root', 'RAVI8271ravi@', {
  dialect: 'mysql',
  host: 'localhost'
});

module.exports = sequelize;

// const Sequelize = require('sequelize');

// const sequelize = new Sequelize('node-complete','root','RAVI8271ravi@',{
//     dialect : 'mysql',
//     host : 'localhost'
// });

// module.exports = sequelize;