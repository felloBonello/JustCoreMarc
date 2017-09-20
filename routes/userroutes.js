const session = require('express-session');
const hash = require('pbkdf2-password')();
const mysql = require('mysql');

const con = require('../database/mysql').con;
const employeeTable = "EMPLOYEES";

//Login
exports.login = (req, res) => {

  if (req.session.username) {
    res.status(400);
    return res.send({message: `You are required to logout before you login ${req.session.username}`});
  }

  //check if username and password were supplied
  if (!req.body.username) {
    res.status(400);
    let error = {message: "username is required"};
    return res.send(error);
  } else if (!req.body.password) {
    res.status(400);
    let error = {message: "password is required"};
    return res.send(error);
  }

  //using prepared statements to prevent sql injection
  const params = [employeeTable, req.body.username];
  const sql = mysql.format('SELECT * FROM ?? WHERE User_Name = ?', params);
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
    hash({password: req.body.password, salt: user.Salt}, (err, pass, salt, hash) => {
      //check if hash matches
      if (hash == user.Password) {
        req.session.regenerate(() => {
          req.session.username = user.User_Name; //store username in session

          //translate database fields to camal case values
          let display = {};
          display.employeeId = user.Employees_Id;
          display.firstName = user.First_Name;
          display.lastName = user.Last_Name;
          display.email = user.Email;
          display.dateOfBirth = user.Date_Of_Birth;
          display.employeeNumber = user.Employee_Number;
          display.seniority = user.Seniority;
          display.username = user.User_Name;

          return res.send(display);
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

  let user = req.body;

  //check if all required fields were entered
  let errors = [];
  if (!user.firstName) {
    errors.push({error: 'firstName is required'});
  }
  if (!user.lastName) {
    errors.push({error: 'lastName is required'});
  }
  if (!user.email) {
    errors.push({error: 'email is required'});
  }
  if (!user.dateOfBirth) {
    errors.push({error: 'dateOfBirth is required'});
  }
  if (!user.employeeNumber) {
    errors.push({error: 'employeeNumber is required'});
  } 
  /*if (!user.seniority) {
    errors.push({error: 'seniority is required'});
  } */
  if (!user.username) {
    errors.push({error: 'username is required'});
  }
  if (!user.password) {
    errors.push({error: 'password is required'});
  }

  //check if any errors occured
  if (errors.length) {
    res.status(400)
    return res.send(errors);
  }

  //using prepared statements to prevent sql injection
  const params = [employeeTable, user.username];
  const findUserSQL = mysql.format('SELECT User_Name FROM ?? WHERE User_Name = ?', params);

  //check if username is already taken
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

      //using prepared statements to prevent sql injection
      const params = [employeeTable, user.firstName, user.lastName, user.email, user.dateOfBirth, 
                      user.employeeNumber, user.username, hash, salt];
      const insertUserSQL = mysql.format('INSERT INTO ?? ' +
      '(First_Name, Last_Name, Email, Date_Of_Birth, Employee_Number, User_Name, Password, Salt)' + 
      'VALUES (?, ?, ?, ?, ?, ?, ?, ?)', params);

      con.query(insertUserSQL, function (err, result) {
        if (err) { 
          console.log(err);
          res.status(500);
          let error = {message: "Unknown error occured"};
          return res.send(error);
        }

        //translate from req.body to display object
        let display = {};
        display.employeeId = result.insertId;
        display.firstName = user.firstName;
        display.lastName = user.lastName;
        display.email = user.email;
        display.dateOfBirth = dateOfBirth;
        display.employeeNumber = user.employeeNumber;
        display.seniority = null; //TODO: figure out how to set seniority
        display.username = user.username;

        req.session.regenerate(() => {
          req.session.username = req.body.username; //store username in session
          return res.send(display);
        });
      });
    });
  });
}

//logout
exports.logout = (req, res) => {
  req.session.destroy(() => { return res.send() });
}