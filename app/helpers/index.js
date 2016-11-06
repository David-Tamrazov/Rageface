'use strict';

const router = require('express').Router();

//iterate through the routes object and mount the routes
let _registerRoutes = (routes, method) => {
  for(let key in routes) {
    //need to make sure that on the outer level, routes contains objects, not arrays
    if (typeof routes[key] === 'object' && routes[key] !== null && !(routes[key] instanceof Array)) {
      //recurse onto the actual http methods and their functions
      _registerRoutes(routes[key], key);
    }


    else {
      if (method === 'get') {
        router.get(key, routes[key]);
      }
      else if (method === 'post') {
        router.post(key, routes[key]);
      }
      else {
        router.use(routes[key]);
      }
    }

  }
}

let route = routes => {
  _registerRoutes(routes);
  return router;
}

module.exports = {
  route
}
