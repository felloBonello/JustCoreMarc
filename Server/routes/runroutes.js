const oauth = require('../lib/oauth');
const workList = require('../modules/worklist');
const userList = require('../modules/userlist');


/**
 * Retrieves all available work items and stores them in a list.
 */
exports.workItems = (req, res) => {

  //check if an authorization header exists
  const token = req.headers.authorization;
  if (!token) {
    res.status(400);
    return res.send({ error: `You are required to be logged in to view runs` });
  }

  oauth.readJWT(token, function (err, decoded) {
    if (err) {
      res.status(err.status);
      return res.send({ error: err.error });
    }

    res.status(200);
    return res.send({workItems: workList.workItems});
  });
}

/**
 * Return all work items that a driver owns.
 */
exports.myWorkItems = (req, res) => {
  //check if an authorization header exists
  const token = req.headers.authorization;
  if (!token) {
    res.status(400);
    return res.send({ error: `You are required to be logged in to view runs` });
  }

  //Get employeeId from JWT.
  oauth.readJWT(token, function (err, decoded) {
    if (err) {
      res.status(err.status);
      return res.send({ error: err.error });
    }

    //Filter work items by employeeId.
    const employeeId = decoded.employeeId;
    const myWorkItems = workList.retrieveMyWorkItems(employeeId, function(err, results) {
      if (err) {
        console.log(err);
        res.status(500);
        return res.send({error: err});
      }

      res.status(200);
      return res.send({workItems: results});
    });

  });
}

/**
 * Select a work item based on work id
 */
exports.selectWorkItem = (req, res) => {
  console.log(req.body);

  //check if an authorization header exists
  const token = req.headers.authorization;
  console.log(req.headers.authorization)
  if (!token) {
    console.log('error')
    res.status(400);
    return res.send({ error: `You are required to be logged in to view runs` });
  }

  oauth.readJWT(token, function (err, decoded) {
    if (err) {
      console.log(err);
      res.status(err.status);
      return res.send({ error: err.error });
    }

    res.status(200);


    //in the future the following function calls should be  transactional
    workList.selectWorkItem(req.body.workId, decoded.employeeId, function (err, result) {
      if (err) {
        console.log(err);
        res.status(400);
        return res.send(err);
      }

      //set employees allowable flag to false after they have made their selection
      userList.updateEmployee(decoded.employeeId, false, function (err, result) {
        if (err) {
          console.log(err);
        }
      });

      return res.send({ affectedRows: result });
    });
  });


}
