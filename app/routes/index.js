'use strict';

const config = require('../config');
const helpers = require('../helpers');
const passport = require('../auth');
const User = require('../models/user.js');
const spawn = require("child_process").spawn;


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

        console.log(pyScriptPath);
        var process = spawn('python', [pyScriptPath]);

        process.stdout.on('data', function(data){
          console.log(JSON.parse(data));
          res.send(data);
        });

        //res.send(__dirname +"/test.py");

      }
    },
    'post': {
      //[validateSender, pass.authenticate(...), ...]
      '/signin': [passport.authenticate('local', {session: false}), (req, res, next)  => {
          //serialize
          //generate token
          //respond
      }],

      //[validateSender, (req, res, next) => {... more stuff here ...}]
      '/signup': (req, res, next) => {
        let username = req.body.username;
        let pw = req.body.password;

        User.createUser(username, pw, (err, user) => {
          if (err) {
            console.log(error);
            res.send(error);
          }

          else if (user) {
            console.log("Created a new user.");
            res.status(200).json({user: user});
          }

          else {
            res.status(500).send("An unknown error has occured.");
          }
        });
      }

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
