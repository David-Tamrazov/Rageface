'use strict';

const config = require('../config');
const helpers = require('../helpers');
const reactFunctions = require('../reactfunctions');

module.exports = () => {
  let routes = {
    'get': {
      '/': (req, res, next) => {
        res.send('<h1> Hello, world!</h1>');
      },
      '/dashboard': (req,res,next)=> {
        res.send('<h1> This is the dashboard!</h1>');
      }
    },
    'post': {

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
