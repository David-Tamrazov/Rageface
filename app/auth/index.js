'use strict';

const passport = require('passport');
const jwt = require('jsonwebtoken');
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

          //send back a user object without the password for security's sake
          var userObject = {
            _id: user._id,
            flows: user.flows,
            username: user.username,
            dateJoined: user.dateJoined
          }
          done(null, userObject);
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

let generateToken = (user, cb) => {

  if (user) {
    let token = jwt.sign({
      id: user._id,
      username: user.username
    }, config.secret, {
      //seconds * minutes
      expiresIn: 60 * 30
    });
    return cb(null, token);
  }

  else {
    return cb(null, null);
  }
}

let generateAccessToken = (user, cb) => {
  return generateToken(user, (error, token) => {
    return cb(null, { user: user, token: token });
  });
}

module.exports = {
  passport,
  generateAccessToken,
  generateToken
}
