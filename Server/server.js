require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
const schedule = require('./schedule/create_schedule');
//const socket = require('./routes/socketroutes')
const http = require('http')
let server = http.createServer(app)
const io = require('socket.io').listen(server);


io.on( 'connection', function ( socket )
{
    io.emit('updateFlag');
    io.on('select.run', (data) => {
        io.broadcast.emit('remove.run',
            {
            }
        )
    })

    io.on('disconnect', (data) => {
        console.log('connection disconnected')
    })
})

app.use(cors());

const port = process.env.PORT || 3000;
const userroutes = require('./routes/userroutes');
const runroutes = require('./routes/runroutes');
const workList = require('./modules/worklist');

//Configure middleware
app.use(bodyParser.json());
//-userroutes
app.post('/v1/createuser', userroutes.creatuser);
app.post('/v1/login', userroutes.login);
app.get('/v1/userinfo', userroutes.userinfo);
//-runroutes
app.get('/v1/workItems', runroutes.workItems);
app.post('/v1/selectWorkItem', runroutes.selectWorkItem);


//make sure parent module starts to listen
if (!module.parent) {
  server.listen(port, () => {
      console.log(`Express started on port ${port}`);
  })
}

workList.fill();
schedule.CreateSchedule(io);
