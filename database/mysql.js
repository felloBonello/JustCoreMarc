const mysql = require('mysql');

//Create connection
const con = mysql.createConnection({
  host: "104.198.208.205",
  user: "martin",
  password: "martin",
  database: "JustCoreMarc"
});

//Connect
con.connect(function(err) {
  //throw err, it is fatal
  if (err) 
    throw err;

  console.log("Connected!");
});

exports.con = con;