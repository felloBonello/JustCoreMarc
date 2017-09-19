const session = require('express-session');
const hash = require('pbkdf2-password')();

const con = require('../database/mysql').con;
const employeeTable = "TempEmployees";

//Login
exports.login = (req, res) => {

  if (req.session.username) {
    res.status(400);
    return res.send({message: `You are required to logout before you login ${req.session.username}`});
  }

  //check if username and password was supplied
  if (!req.body.username) {
    res.status(400);
    let error = {message: "username is required"};
    return res.send(error);
  } else if (!req.body.password) {
    res.status(400);
    let error = {message: "password is required"};
    return res.send(error);
  }

  //TODO: sanitize input to prevent sql injections
  const sql = `SELECT * FROM ${employeeTable} WHERE username = '${req.body.username}'`;
  con.query(sql, function (err, result, fields) {

    if (err) {
      //TODO: log this shit
      res.status(500);
      let error = {message: "Unknown error occured"};
      return res.send(error);
    }
    
    if (result.length === 0) {
      res.status(400);
      let error = {message: `No employee exists with the username ${req.body.username}`};
      return res.send(error);
    }

    let user = result[0];
    hash({password: req.body.password, salt: user.salt}, (err, pass, salt, hash) => {
      //check if hash matches
      if (hash == user.hash) {
        req.session.regenerate(() => {
          req.session.username = user.username; //store username in session
          return res.send({message: `Welcome: ${req.body.username}`});
        });
      } else {
        //wrong password
        res.status(401);
        return res.send({message: 'Wrong pasword!'});
      }
    });
  });
}

//Create User
exports.creatuser = (req, res) => {

  if (req.session.username) {
    res.status(400);
    return res.send({message: `You are required to logout before you register ${req.session.username}`});
  }

  //check if username and password was supplied
  if (!req.body.username) {
    res.status(400);
    let error = {message: "username is required"};
    return res.send(error);
  } else if (!req.body.password) {
    res.status(400);
    let error = {message: "password is required"};
    return res.send(error);
  }

  //check if username is already taken
  const findUserSQL = `SELECT username FROM ${employeeTable} WHERE username = '${req.body.username}'`;
  con.query(findUserSQL, function (err, result) {
    //Check for SQL errors
    if (err) { 
      console.log(err);
      res.status(500);
      let error = {message: "Unknown error occured"};
      return res.send(error);
    }

    if (result.length > 0) {
      res.status(400);
      return res.send({message: `Username ${req.body.username} is already taken`});
    }

    hash({password: req.body.password}, (err, pass, salt, hash) => {
      //check for hash error
      if (err) {
        console.log(err);
        res.status(500);
        let error = {message: "Unknown error occured"};
        return res.send(error);
      }

      //TODO: sanitize input to prevent sql injections

      const insertUserSQL = `INSERT INTO ${employeeTable} (username, hash, salt) VALUES ('${req.body.username}', '${hash}', '${salt}')`;

      con.query(insertUserSQL, function (err, result) {
        if (err) { 
          console.log(err);
          res.status(500);
          let error = {message: "Unknown error occured"};
          return res.send(error);
        }

        req.session.regenerate(() => {
          req.session.username = req.body.username; //store _id in session
          return res.send({message: `Welcome: ${req.body.username}`});
        });
      });
    });
  });
}

//logout
exports.logout = (req, res) => {
  req.session.destroy(() => { return res.send() });
}