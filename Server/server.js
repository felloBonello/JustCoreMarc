require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
const http = require('http')
const schedule = require('./schedule/create_schedule');
let server = http.createServer(app)
const socket = require('./routes/socketroutes')
const io = require('socket.io').listen(server);

io.sockets.on('connection', socket);

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


//make sure parent module starts to listen
if (!module.parent) {
  server.listen(port, () => {
      console.log(`Express started on port ${port}`);
  })
}

workList.fill();
schedule.CreateSchedule();
