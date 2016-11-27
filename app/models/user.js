const db = require('../db');

var Mongoose = db.mong;

const rageface_user = Mongoose.Schema({
  username: {
    type: String,
    required: 'Username is required to create an account.',
    unique: true
  },
  password: {
    type: String,
    required: 'Password required to create an account'
  },
  flows: Array,
  dateJoined: Date
});

let User = Mongoose.model('rageface_user', rageface_user);

let findByUsername = (username, cb) => {
  User.findOne({"username": username}, (err, result) => {
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

let createUser = (username, pw, cb) => {
  let newUser = new User({
    username: username,
    password: pw,
    dateJoined: new Date()
  });

  newUser.save(error => {
    if (error) {
      return cb(error, null);
    }
    else {
      return cb(null, newUser);
    }
  });
}

module.exports = {
  User,
  findByUsername,
  createUser
}
