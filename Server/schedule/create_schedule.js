const schedule = require('node-schedule');
const con = require('../database/mysql').con;
const moment = require('moment');

const ALL_SCHEDULE_DAYS = "SELECT * FROM BID_SCHEDULE";
const UPDATE_EMPLOYEE = "UPDATE Employee SET Is_Allowed = true WHERE Bid_Time = ?";
const MS_PER_MINUTE = 60000;

let CreateSchedule = (io) => {

    con.query(ALL_SCHEDULE_DAYS, function(err, results) {
        if (err) {
            console.log(err); //TODO: log this with npm package morgan.
        }

        for (let i = 0; i < results.length; ++i) {

            console.log('Added bid schedule for: ' +
                moment(results[i].Start_Time).format('YYYY-MM-DD hh:mm:ss a') + ' to ' + moment(results[i].End_Time).format('YYYY-MM-DD hh:mm:ss a'));

            let startTime = new Date(results[i].Start_Time) - (2 * MS_PER_MINUTE);
            let endTime = new Date(results[i].End_Time) + (2 * MS_PER_MINUTE);

            var j = schedule.scheduleJob({ start: startTime, end: endTime, rule: '*/2 * * * *' }, function(){

                const time = moment().format('YYYY-MM-DD HH:mm:ss');
                console.log(time);



                con.query(mysql.format(UPDATE_EMPLOYEE, [time]), function(err, results) {
                    if (err) {
                        console.log(err); //TODO: log this with npm package morgan.
                    }
                    io.emit('updateFlag');
                });
            });
        }
    });

}


module.exports = {CreateSchedule};