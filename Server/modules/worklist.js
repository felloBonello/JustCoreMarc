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

    workItems: new Array(),

    fill: function () {
        let buildList = [];

        con.query(ALL_WORK_ITEMS, function(werr, wresults) {
            if (werr) {
                console.log(werr);
            }

            for (let i = 0; i < wresults.length; ++i) {
                let item = {};

                item.workId = wresults[i].workId;
                item.hasDetails = wresults[i].hasDetails;
                item.daysOff = [];
                item.runs = [];

                //fill days off array for work item
                con.query(mysql.format(DAYS_OFF_BY_WORK_ID, item.workId), function(derr, dresults) {
                    if (derr) {
                        console.log(derr);
                    }

                    for (let i = 0; i < dresults.length; ++i) {
                        item.daysOff.push(dresults[i]);
                    }
                });

                //fill run array for work item
                con.query(mysql.format(RUNS_BY_WORK_ID, item.workId), function(rerr, rresults) {
                    if (rerr) {
                        console.log(rerr);
                    }

                    for (let i = 0; i < rresults.length; ++i) {
                        item.runs.push(rresults[i]);
                    }
                });

                buildList.push(item);
            }
        });

        this.workItems = buildList;
    }
};