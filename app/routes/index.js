'use strict';

const spawn = require("child_process").spawn;
const async = require('async');
const config = require('../config');
const helpers = require('../helpers');
const User = require('../models/user.js');
const Auth = require('../auth');
const passport = Auth.passport;


module.exports = () => {
  let routes = {
    'get': {
      '/': (req, res, next) => {

        res.send('<h1> Hello, world!</h1>');
      },
      '/dashboard': (req,res,next)=> {
        res.send('<h1> This is the dashboard!</h1>');
      },

      //[validateSender,(req, res, next) => {...}]
      '/getgifs': (req, res, next) => {
        let pyScriptPath = "/Users/Dave/Documents/Uni Work/COMP 307/Rageface/app/scripts/test.py";

        var process = spawn('python', [pyScriptPath]);

        process.stdout.on('data', function(data){
          res.send(JSON.parse(data));
        });

        //res.send(__dirname +"/test.py");

      }
    },
    'post': {
      //[validateSender, pass.authenticate(...), ...]
      '/signin': [passport.authenticate('local', {session: false}), (req, res, next)  => {
          //serialize
          var user = req.user;
          Auth.generateAccessToken(user, (error, result) => {
            if (error) {
              res.status(500).send(error);
            }
            else if (result) {
              res.status(200).send(result);
            }
            else {
              res.status(500).send("An unknown error has occured.");
            }
          });
          //generate token
          //respond
      }],

      //[validateSender, (req, res, next) => {... more stuff here ...}]
      '/signup': (req, res, next) => {

        let username = req.body.username;
        let pw = req.body.password;

        function serializeUser(cb) {
          return User.createUser(username, pw, cb);
        }

        async.waterfall([
          serializeUser,
          Auth.generateAccessToken
        ], (err, results) => {

          if (err) {
            throw err;
            res.status(500).send(err);
          }
          else if (results) {
            res.status(200).send(results);
          }
          else {
            res.status(500).send("An unknown error has occured.");
          }
        });
      }

      // User.createUser(username, pw, (error, user) => {
      //   if (error) {
      //     res.status(500).send(error);
      //   }
      //   else if (user) {
      //     res.status(200).send(user);
      //   }
      //   else {
      //     res.status(500).send("An unknown error has occured.");
      //   }
      // });

    },
    'update': {

    },
    'patch': {

    },
    'delete': {

    }
  }

  return helpers.route(routes);
}
