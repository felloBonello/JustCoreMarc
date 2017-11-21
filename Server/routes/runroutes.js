const oauth = require('../lib/oauth');
const workList = require('../modules/worklist');


/**
 * Retrieve all work items and store them in a list
 */
exports.workItems = (req, res) => {

  //check if an authorization header exists
  const token = req.headers.authorization;
  if (!token) {
    res.status(400);
    return res.send({error: `You are required to be logged in to view runs`});
  }

  oauth.readJWT(token, function(err, decoded) {
    if (err) {
      res.status(err.status);
      return res.send({error: err.error});
    }

    res.status(200);
    return res.send(workList.workItems);
  });
}

/**
 * Select a work item based on work id
 */
exports.selectWorkItem = (req, res) => {

    //check if an authorization header exists
    const token = req.headers.authorization;
    if (!token) {
        res.status(400);
        return res.send({error: `You are required to be logged in to view runs`});
    }

    oauth.readJWT(token, function(err, decoded) {
        if (err) {
            res.status(err.status);
            return res.send({error: err.error});
        }

        res.status(200);
        let workId = workList.selectWorkItem(req.body.workId, req.body.employeeId);
        return res.send({workId: workId});
    });
}