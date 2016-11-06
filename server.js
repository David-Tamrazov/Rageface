'use strict';

const express = require('express');
const app = express();
const rageface = require('./app');

//set the port
app.set('port', process.env.PORT || 3000);

//express middleware used for serving up static assets (unchanging)
//argument is the directory where it can find the assets
//in our case, we can store the rageface logo and whatever other visual assets will remain constant throughout the app
app.use(express.static('public'));

//the templating engine
app.set('view engine', 'ejs');

//maybe use sessions...

app.use('/', rageface.router);
app.listen(app.get('port'), () => {
  console.log("Rageface running on port: " + app.get('port'));
});
