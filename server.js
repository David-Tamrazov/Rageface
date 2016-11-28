'use strict';

const express = require('express');
const app = express();
const rageface = require('./app');
const passport = require('./app/auth').passport;
const bodyParser = require('body-parser');

//set the port
app.set('port', process.env.PORT || 3000);

//express middleware used for serving up static assets (unchanging)
//argument is the directory where it can find the assets
//in our case, we can store the rageface logo and whatever other visual assets will remain constant throughout the app
app.use(express.static(__dirname + '/public'));
app.use(passport.initialize());

//request body parsers
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  //allows for the decoding of url encoded bodies
  extended: true
}));

//maybe use sessions...

app.use('/', rageface.router);

rageface.ioServer(app).listen(app.get('port'), () => {
  console.log("Rageface running on port: " + app.get('port'));
});
