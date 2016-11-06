'use strict';

if(process.env.NODE_ENV ==="production") {
  module.exports = {
    host: process.env.host || "",
    
  }
} else {
  module.exports = require('./development.json');
}
