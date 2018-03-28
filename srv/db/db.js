var mysql = require('mysql');
var config = require('../config/.db');
console.log(config)

var db = mysql.createConnection({
  host: config.host,
  user: config.user,
  password: config.pass,
  database: config.db
});

module.exports = db;
