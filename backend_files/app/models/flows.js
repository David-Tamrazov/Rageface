const db = require("../db");

var Mongoose = db.mong;

const rage_flow = Mongoose.Schema({
  owner: String,
  urls: Array,
  nuLikes: Number
});

let RageFlow = Mongoose.model('rage_flow', rage_flow);

module.exports = {
  RageFlow
}
