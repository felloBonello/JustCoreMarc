const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const app = express();

const port = 3000;

// Populates req.session
app.use(bodyParser.json());
app.use(session({
  resave: false, // don't save session if unmodified
  saveUninitialized: false, // don't create session until something stored
  secret: 'keyboard cat'
}));

//user routes
const userroutes = require('./routes/userroutes');
app.post('/v1/createuser', userroutes.creatuser);
app.post('/v1/login', userroutes.login);
app.get('/v1/logout', userroutes.logout);

//Welcome route
app.get('/', function(req, res) {
  if (req.session.username) {
    res.send({message: `Hello ${req.session.username}`});
  } else {
    res.send({message: 'Hello guest'});
  }
});

/* istanbul ignore next */
if (!module.parent) {
  app.listen(port);
  console.log(`Express started on port 3000 ${port}`);
}