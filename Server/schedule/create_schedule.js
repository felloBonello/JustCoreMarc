const schedule = require('node-schedule');
const con = require('../database/mysql').con;
const moment = require('moment');

const ALL_SCHEDULE_DAYS = "SELECT * FROM BID_SCHEDULE_DAYS";
const MS_PER_MINUTE = 60000;

let CreateSchedule = () => {

    con.query(ALL_SCHEDULE_DAYS, function(err, results) {
        if (err) {
            console.log(err); //TODO: log this with npm package morgan.
        }

        for (let i = 0; i < results.length; ++i) {

            let startTime = new Date(results[i].Start_Time) - (2 * MS_PER_MINUTE);
            let endTime = new Date(results[i].End_Time);

            console.log('Added bid schedule for: ' +
                moment(startTime).format('YYYY-MM-DD hh:mm:ss a') + ' to ' + moment(endTime).format('YYYY-MM-DD hh:mm:ss a'));

            var j = schedule.scheduleJob({ start: startTime, end: endTime, rule: '*/2 * * * *' }, function(){
                console.log(moment().format('YYYY-MM-DD hh:mm:ss a'));
            });
        }
    });

}


module.exports = {CreateSchedule};