'use strict';

const config = require('./config');

let ioServer = app => {

  //app.locals allows us to define application-wide variables that get stored in memory
  app.locals.allFeeds = [];
  const server = require('http').Server(app);
  const io = require('socket.io')(server);
  require('./socket')(io, app);
  return server;
}

module.exports = {
  router: require('./routes')(),
  ioServer
}
