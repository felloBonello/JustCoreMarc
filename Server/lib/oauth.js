const mysql = require('mysql');
const hash = require('pbkdf2-password')();
const jwt = require('jsonwebtoken');

const con = require('../database/mysql').con;
const constants = require('./constants');
const utils = require('./utils');

exports.isAllowedToPick = (token, cb) => {
  this.readJWT(token, function (err, data) {
    if (err) {
      //TODO: fix this. treat failure as user can not pick.
      return cb(null, false);
    }

    //using prepared statements.
    const params = [data.employeeId];
    const findUserTimeSQL = mysql.format('SELECT Is_Allowed FROM EMPLOYEE WHERE Employee_Id = ?', params);

    con.query(findUserTimeSQL, function (err, result) {
      //Check for SQL errors
      if (err) {
        //TODO: fix this. treat failure as user can not pick.
        return cb(null, false);
      }

      var isAllowed = result[0].Is_Allowed === 1
      return cb(null, isAllowed);
    });
  });
}

/**
 * Reads in a JWT token, verifies (decodes) the token and if valid invokes the 
 * callback with a EmployeeViewModel, if invalid invokes the callback with an error.
 * @param {String} token - A JSON web token
 * @param {Function} callback - The callback to invoke when the verify has completed
 */
exports.readJWT = (token, cb) => {

  jwt.verify(token, process.env.SECRET, function (err, decoded) {
    if (err) {
      console.log(err); //TODO: log this with npm package morgan.
      cb(utils.createError(400, 'Invalid oauth token.'), null);
      return;
    }

    cb(null, decoded);
    return;
  });
}

/**
 * Checks the EMPLOYEES table if the username exists, if it doesn't exist it invokes the
 * calback function with an error, if the username does exist it attempts to hash the 
 * password with the salt in the database attached to the username. If the hashes match 
 * it invokes the callback with a employee view model encoded in a JSON web token. If the password
 * is invalid it invokes the callback with an error.
 * @param {String} username - the username to sign into
 * @param {String} password - the password to use to sign in
 * @param {Function} cb - The callback to invoke when the function has completed
 */
exports.authenticateUser = (userName, password, cb) => {

  //using prepared statements to prevent sql injection
  const sql = mysql.format('SELECT * FROM ?? WHERE User_Name = ?', [constants.EMPLOYEE_TABLE, userName]);
  con.query(sql, function (err, result, fields) {

    if (err) {
      console.log(err); //TODO: log this with npm package morgan.
      cb(utils.createError(500, 'Database error. Please contact support.'), null);
      return;
    }

    if (result.length === 0) {
      cb(utils.createError(400, `No employee exists with the user name ${userName}`), null);
      return;
    }

    let user = result[0];
    hash({ password: password, salt: user.Salt }, (err, pass, salt, hash) => {
      //check if hash matches
      if (hash == user.Password) {

        let employee = {};
        employee.employeeId = user.Employee_Id;
        employee.firstName = user.First_Name;
        employee.lastName = user.Last_Name;
        employee.email = user.Email;
        employee.dob = user.Date_Of_Birth;
        employee.userName = user.User_Name;
        employee.isAllowed = user.Is_Allowed;
        employee.bidTime = user.Bid_Time;

        const token = jwt.sign(employee, process.env.SECRET, function (err, token) {
          cb(null, { token: token, employee: employee });
          return;
        });

      } else {
        //incorrect password
        cb(utils.createError(401, 'Incorrect password'), null);
        return;
      }
    });
  });
}

/**
 * Inserts a user into the database and returns a JSON web token containing
 * the informaton of the user. If the username exists the callback is invoked with an error, 
 * if all the database queires are successful it will invoke the callback with the
 * a employee model encoded in a JSON web token.
 * @param {Object} user - user model containing information needed to create a user
 * @param {Function} cb - the callback function to invoke once finsihed
 */
exports.registerUser = (user, cb) => {

  //using prepared statements to prevent sql injection
  const params = [constants.EMPLOYEE_TABLE, user.userName];
  const findUserSQL = mysql.format('SELECT User_Name FROM ?? WHERE User_Name = ?', params);

  //check if username is already taken
  con.query(findUserSQL, function (err, result) {
    //Check for SQL errors
    if (err) {
      console.log(err); //TODO: log this with npm package morgan.
      cb(utils.createError(500, 'Unknown error occured'), null);
      return;
    }

    if (result.length > 0) {
      cb(utils.createError(400, `Username ${user.userName} is already taken`), null);
      return;
    }

    hash({ password: user.password }, (err, pass, salt, hash) => {
      //check for hash error
      if (err) {
        console.log(err); //TODO: log this with npm package morgan.
        cb(utils.createError(500, 'Unknown error occured'), null);
        return;
      }

      //using prepared statements to prevent sql injection
      const params = [constants.EMPLOYEE_TABLE, user.employeeNumber, user.firstName, user.lastName, user.email, user.dob,
      user.userName, false, hash, salt];
      const insertUserSQL = mysql.format('INSERT INTO ?? ' +
        '(Employee_Id, First_Name, Last_Name, Email, Date_Of_Birth, User_Name, Is_Allowed, Password, Salt)' +
        'VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)', params);

      con.query(insertUserSQL, function (err, result) {
        if (err) {
          console.log(err); //TODO: log this with npm package morgan.
          cb(utils.createError(500, 'Unknown error occured'), null);
          return;
        }

        //translate from database model to display model
        let employee = {};
        employee.employeeId = user.employeeNumber;
        employee.firstName = user.firstName;
        employee.lastName = user.lastName;
        employee.email = user.email;
        employee.dob = user.dateOfBirth;
        employee.userName = user.userName;
        employee.isAllowed = false;

        jwt.sign(employee, process.env.SECRET, function (err, token) {
          //I honestly don't know what could cause this error, best to check tho.
          if (err) {
            console.log(err); //TODO: log this with npm package morgan.
            cb(utils.createError(500, 'Unknown error occured'), null);
            return;
          }

          cb(null, { token: token, employee: employee });
          return;
        });
      });
    });
  });
}