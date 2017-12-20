require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
const schedule = require('./schedule/create_schedule');
const http = require('http')
let server = http.createServer(app)
const io = require('socket.io').listen(server);
const oauth = require('./lib/oauth');


io.on('connection', function (socket) {

  console.log('new connection');

  // socket.emit('notifyPicker', () => {
    
  // })

    socket.on('select.run', (data) => {
        socket.broadcast.emit('remove.run', data);
        console.log("Work id is " + data);
    })

    socket.on('disconnect', (data) => {
        console.log('connection disconnected')
    })

  socket.on('doIPick', function(token) {
    console.log('doIPick');
    oauth.isAllowedToPick(token, function(err, isAllowed) {
      if (err) {
        console.log('Error when decoding token from socket ' + err);
        socket.emit('notifyPicker', false);
      } else {
        socket.emit('notifyPicker', isAllowed);
      }
    })
  });

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
app.get('/v1/workItems/me', runroutes.myWorkItems);
app.post('/v1/selectWorkItem', runroutes.selectWorkItem);


//make sure parent module starts to listen
if (!module.parent) {
  server.listen(port, () => {
    console.log(`Express started on port ${port}`);
  })
}

workList.fill();
schedule.CreateSchedule();
