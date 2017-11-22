const oauth = require('../lib/oauth');
const workList = require('../modules/worklist');
const userList = require('../modules/userlist');


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


        //in the future the following function calls should be  transactional
        workList.selectWorkItem(req.body.workId, decoded.employeeId, function(result, err) {
            if (err) {
                console.log(err);
                res.status(400);
                return res.send(err);
            }

            //set employees allowable flag to false after they have made their selection
            userList.updateEmployee(decoded.employeeId, false, function(result, err) {
                if(err) {
                    console.log(err);
                }
            });

            return res.send({affectedRows: result });
        });
    });


}
