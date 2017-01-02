const config = require('../config');

const mong = require('mongoose').connect(config.dbURI);
mong.Promise = global.Promise;

mong.connection.on('error', error => {
  console.log("Error connecting to mongodb: ", error, "\n");
});


module.exports = {
  mong
}
