const mysql = require('mysql');

//Create connection
const con = mysql.createConnection({
  host: process.env.DBHOST,
  user: process.env.DBUSER,
  password: process.env.DBPASSWORD,
  database: process.env.DATABASE
});

//Connect
con.connect(function(err) {
  //throw err, it is fatal
  if (err) 
    throw err;

  console.log("Connected!");
});

exports.con = con;