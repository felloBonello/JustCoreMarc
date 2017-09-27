const oauth = require('../lib/oauth');
const mysql = require('mysql');

const con = require('../database/mysql').con;
const ALL_RUNS = 'SELECT * FROM RUN';

/**
 * Retrieve all runs in the database, it might be wise to use pagination.
 */
exports.runs = (req, res) => {

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

    // Right now there is currently no restriction on a user to view certain runs.
    // The information for the JSON web token is not need, but needs to be valid.
    // In the future we will need to restrict viewing runs based on seniority.

    con.query(ALL_RUNS, function(err, results) {
      if (err) {
        console.log(err); //TODO: log this with npm package morgan.
        res.status(500);
        return res.send('Unknown error occured');
      }

      let runs = [];
      for (let i = 0; i < results.length; ++i) {
        let run = {};

        run.id = results[i].Run_Id;
        run.busRoute = results[i].Route_Number;
        run.startTime = null;
        run.endTime = null;
        run.startLocation = null;
        run.endLocation = null;
        run.daysOff = null;

        runs.push(run);
      }
      return res.send({runs});
    });
  });
}

/**
 * 
 */
exports.run = (req, res) => {
  //TODO: get run by
}