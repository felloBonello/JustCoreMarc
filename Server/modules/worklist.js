const con = require('../database/mysql').con;
const mysql = require('mysql');

const ALL_WORK_ITEMS =
    "SELECT "
    + "Work_Id 	          as workId, "
    + "Has_Details        as hasDetails "
    + "FROM WORK;";

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

module.exports = {

    workItems: [],

    fill: function () {
        let workItems = this.workItems;

        con.query(ALL_WORK_ITEMS, function(err, results) {
            if (err) {
                console.log(werr);
            }

            for (let i = 0; i < results.length; ++i) {
                let item = {};

                item.workId = results[i].workId;
                item.hasDetails = results[i].hasDetails;
                item.daysOff = [];
                item.runs = [];

                getDaysOff(item.workId, function(result, err) {
                    if (err) {
                        console.log(err);
                    }

                    item.daysOff = result;
                });

                getRuns(item.workId, function(result, err) {
                    if (err) {
                        console.log(err);
                    }

                    item.runs = result;
                    workItems.push(item);
                });
            }
        });
    }
};

//fill days off array for work item
function getDaysOff(workId, callback) {
    con.query(mysql.format(DAYS_OFF_BY_WORK_ID, workId), function(err, results) {
        callback(results, err);
    });
}

//fill run array for work item
function getRuns(workId, callback) {
    con.query(mysql.format(RUNS_BY_WORK_ID, workId), function(err, results) {

        let runs = []

        for (let i = 0; i < results.length; ++i) {
            results[i].timeOn = results[i].timeOn.slice(0, -3);
            results[i].timeOff = results[i].timeOff.slice(0, -3);
            runs.push(results[i]);
        }

        callback(runs, err);
    });
}