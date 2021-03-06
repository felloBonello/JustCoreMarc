const con = require('../database/mysql').con;
const mysql = require('mysql');

const AVAILABLE_WORK_ITEMS =
  "SELECT "
  + "Work_Id 	          as workId, "
  + "Has_Details        as hasDetails, "
  + "Employee_Id        as employeeId "
  + "FROM WORK "
  + "WHERE Employee_Id IS NULL;";

const DAYS_OFF_BY_WORK_ID =
  "SELECT "
  + "Day                as day "
  + "FROM WORK_DAY AS wd "
  + "INNER JOIN DAY AS d ON wd.Day_Id = d.Day_Id "
  + "WHERE wd.Work_Id = ?;";

const RUNS_BY_WORK_ID =
  "SELECT "
  + "r.Run_Id             as runId, "
  + "r.Work_Id            as workId, "
  + "r.Route_Number       as routeNumber, "
  + "r.Run_Number         as runNumber, "
  + "day_on.day           as daysOn, "
  + "start.Location_Code  as releasePoint, "
  + "r.Time_On            as timeOn, "
  + "r.Time_Off           as timeOff, "
  + "end.Location_Code    as endPoint, "
  + "r.Platform_Time	    as platformTime, "
  + "r.Report_Time	    as reportTime, "
  + "r.Travel_Time	    as travelTime, "
  + "r.Pays			    as pays, "
  + "r.Spread_Time	    as spreadTime, "
  + "r.Special_Details    as specialDetails, "
  + "r.Is_ShowUp 	        as isShowUp "
  + "FROM RUN AS r "
  + "INNER JOIN LOCATION AS start ON start.Location_Id = r.Release_Point_Id "
  + "INNER JOIN LOCATION AS end ON end.Location_Id = r.End_Point_Id "
  + "INNER JOIN DAY AS day_on On day_on.Day_Id = r.Days_On_Id "
  + "WHERE r.Work_Id = ?;";

const UPDATE_WORK_ITEM =
  "UPDATE WORK " +
  "SET Employee_Id = ? " +
  "WHERE Work_Id = ?; ";

const IS_ALLOWED =
  "SELECT Is_Allowed as isAllowed " +
  "FROM EMPLOYEE " +
  "WHERE Employee_Id = ?; ";

const MY_WORK_ITEMS =
  "SELECT "
  + "Work_Id 	          as workId, "
  + "Has_Details        as hasDetails, "
  + "Employee_Id        as employeeId "
  + "FROM WORK "
  + "WHERE Employee_Id = ?;";

module.exports = {

  workItems: [],

  fill: function () {
    let workItems = this.workItems;

    con.query(AVAILABLE_WORK_ITEMS, function (err, results) {
      if (err) {
        console.log(err);
      }

      for (let i = 0; i < results.length; ++i) {
        let item = {};

        item.workId = results[i].workId;
        item.hasDetails = results[i].hasDetails;
        item.employeeId = results[i].employeeId;
        item.daysOff = [];
        item.runs = [];

        getDaysOff(item.workId, function (err, result) {
          if (err) {
            console.log(err);
          }

          item.daysOff = result;
        });

        getRuns(item.workId, function (err, result) {
          if (err) {
            console.log(err);
          }

          item.runs = result;
          workItems.push(item);
        });
      }
    });
  },

  selectWorkItem: function (workId, employeeId, callback) {

    let workItems = this.workItems;

    checkPermission(employeeId, function (err, results) {
      let isAllowed = false;

      if (err) {
        console.log(err);
        callback(err, 0);
        return;
      }

      if (results.length > 0) {
        isAllowed = results[0].isAllowed
      }

      if (isAllowed) {

        let item = null;
        let index = -1;

        for (i = 0; i < workItems.length; i++) {
          if (workItems[i].workId === workId) {
            item = workItems[i];
            index = i;
          }
        }

        if (item === null) {
          callback('work id ' + workId + ' not found.', null);
          return;
        }
        else {
          item.employeeId = employeeId;

          workItems.splice(index, 1);

          updateWorkItem(employeeId, workId, function (err, results) {
            if (err) {
              console.log(err);
              callback(err, null);
              return;
            } else {
              let affectedRows = results.affectedRows;

              callback(null, affectedRows);
              return;
            }
          });
        }
      }
      else {
        callback({ error: 'You aren\'t allowed to choose right now.' }, null);
        return;
      }
    });
  },

  retrieveMyWorkItems: function (employeeId, callback) {

    con.query(mysql.format(MY_WORK_ITEMS, [employeeId]), function (err, results) {
      if (err) {
        console.log(err);
        callback(e, null);
      }

      //Check if any workitems were return.
      let myWorkItems = [];
      if (results.length <= 0) {
        return callback(null, myWorkItems);
      }
      
      for (let i = 0; i < results.length; ++i) {
        let item = {};

        item.workId = results[i].workId;
        item.hasDetails = results[i].hasDetails;
        item.employeeId = results[i].employeeId;
        item.daysOff = [];
        item.runs = [];

        //TODO: make these requests at the same time async. -Corey
        getDaysOff(item.workId, function (err, result) {
          if (err) {
            console.log(err);
            return callback(e, null);
          }

          item.daysOff = result;
          getRuns(item.workId, function (err, result) {
            if (err) {
              console.log(err);
              return callback(e, null);
            }

            item.runs = result;
            myWorkItems.push(item);
            if (myWorkItems.length >= results.length) {
              //myWorkItems list is complete.
              return callback(null, myWorkItems);
            }
          });
        });
      }
    });
  },
};


function updateWorkItem(employeeId, workId, callback) {
  con.query(mysql.format(UPDATE_WORK_ITEM, [employeeId, workId]), function (err, results) {
    callback(err, results);
  });
}

//check if employee is allowed to select a work item
function checkPermission(employeeId, callback) {
  con.query(mysql.format(IS_ALLOWED, employeeId), function (err, results) {
    callback(err, results);
  });
}

//fill days off array for work item
function getDaysOff(workId, callback) {
  con.query(mysql.format(DAYS_OFF_BY_WORK_ID, workId), function (err, results) {
    callback(err, results);
  });
}

//fill run array for work item
function getRuns(workId, callback) {
  con.query(mysql.format(RUNS_BY_WORK_ID, workId), function (err, results) {

    let runs = []

    for (let i = 0; i < results.length; ++i) {
      results[i].timeOn = results[i].timeOn.slice(0, -3);
      results[i].timeOff = results[i].timeOff.slice(0, -3);
      runs.push(results[i]);
    }

    callback(err, runs);
  });
}