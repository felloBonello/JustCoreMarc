require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');

app.use(cors());

const port = process.env.PORT || 3000;
const userroutes = require('./routes/userroutes');

//Configure middleware
app.use(bodyParser.json());
//-userroutes
app.post('/v1/createuser', userroutes.creatuser);
app.post('/v1/login', userroutes.login);
app.get('/v1/userinfo', userroutes.userinfo);


//make sure parent module starts to listen
if (!module.parent) {
  app.listen(port);
  console.log(`Express started on port ${port}`);
}