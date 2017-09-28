const oauth = require('../lib/oauth');
const mysql = require('mysql');

const con = require('../database/mysql').con;
const ALL_RUNS = "SELECT RUN.Run_Id, RUN.Route_Number, RUN.Time_On, RUN.Time_Off, " + 
"RL1.Location as 'Release_Point', RL2.Location as 'End_Point', D1.day as 'Day1_Off' FROM RUN " +
"INNER JOIN RUN_LOCATIONS AS RL1 ON RL1.Run_Type_Id = RUN.Release_Point_Id " +
"INNER JOIN RUN_LOCATIONS AS RL2 ON RL2.Run_Type_Id = RUN.End_Point_Id " +
"INNER JOIN WORK AS W1 ON W1.Work_Id = RUN.Work_Id " +
"INNER JOIN DAYS AS D1 ON D1.Day_Id = W1.Day_Off1_Id;";
/*INNER JOIN DAYS AS D2 ON D2.Day_Id = W1.Day_Off2_Id*/

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
        run.startTime = results[i].Time_On;
        run.endTime = results[i].Time_Off;
        run.startLocation = results[i].Release_Point;
        run.endLocation = results[i].End_Point;
        run.daysOff = results[i].Day1_Off;

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