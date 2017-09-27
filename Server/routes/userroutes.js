const oauth = require('../lib/oauth');

/**
 * Login
 */
exports.login = (req, res) => {

  //check if an authorization header already exists
  if (req.headers.authorization) {
    res.status(400);
    return res.send({error: `You are required to logout before you login`});
  }

  //check if username and password were supplied
  if (!req.body.username) {
    res.status(400);
    return res.send({error: "username is required"});
  } else if (!req.body.password) {
    res.status(400);
    return res.send({error: "password is required"});
  }

  oauth.authenticateUser(req.body.username, req.body.password, function(err, token) {
    if (err) {
      res.status(err.status);
      return res.send({error: err.error});
    }

    return res.send({token});
  });
}

/**
 * Create User
 */
exports.creatuser = (req, res) => {

  //check if an authorization header alreay exists
  if (req.headers.authorization) {
    res.status(400);
    return res.send({error: `You are required to logout before you login`});
  }

  //check if all required fields were entered
  let user = req.body;
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

  oauth.registerUser(user, function(err, token) {
    if (err) {
      res.status(err.status);
      return res.send({error: err.error});
    }

    return res.send({token});
  });
}

/**
 * Retrieves User Info
 */
exports.userinfo = (req, res) => {

  //extract Authorization header
  const token = req.headers.authorization;
  if (!token) {
    res.status(400);
    return res.send({error: `Authorization token is missing`});
  }

  oauth.readJWT(token, function(err, decoded) {
    if (err) {
      res.status(err.status);
      return res.send({error: err.error});
    }

    res.status(200);
    return res.send({decoded});
  });
}