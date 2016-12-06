const db = require('../db');

var Mongoose = db.mong;

const rageface_user = Mongoose.Schema({
  username: {
    type: String,
    unique: true
  },
  password: String,
  flows: Array,
  dateJoined: Date
});

let User = Mongoose.model('rageface_user', rageface_user);

let findByUsername = (username, cb) => {
  User.findOne({"username": username}, (err, user) => {
    if (err) {
      return cb(err, null);
    }
    else if (user) {
      return cb(null, user);
    }
    else {
      return cb(null, null);
    }
  });
}

function serializeUser(cb) {
  return createUser(username, pw, cb);
}

let createUser = (username, pw, cb) => {

  findByUsername(username, (err, user) => {
    if (err) {
      cb (err, null);
    }

    //found a user already with that username- bail
    else if (user) {
      cb(null, null);
    }

    else {


    }
  })

  let user = new User({
    username: username,
    password: pw,
    flows: [],
    dateJoined: new Date()
  });
  
  user.save(error => {
    if (error) {
      return cb(error, null);
    }
    else {
      return cb(null, user);
    }
  });
}

module.exports = {
  User,
  findByUsername,
  createUser
}
