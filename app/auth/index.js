'use strict';

const passport = require('passport');
const Strategy = require('passport-local');
const config = require('../config');
const User = require('../models/user.js');


passport.use(new Strategy((username, password, done) => {
    User.findByUsername(username, function(err, user) {
      if (err) {
        console.log(err);
        done(err, null);
      }
      else if (user) {

        if (user.username === username && user.password === password) {
          done(null, user);
        }
        else {
          done(null, false);
        }
      }
      else {
        done(null, false);
      }
    })
}));

module.exports = passport;
