var global = require('./global');
var Leaderboard = require('leaderboard');

// See http://stackoverflow.com/questions/7765767/show-week-number-with-javascript
Date.prototype.getWeek = function() {
  var onejan = new Date(this.getFullYear(), 0, 1);
  return Math.ceil((((this - onejan) / 86400000) + onejan.getDay() + 1) / 7);
}

exports.create = function(date) {
  if(!date) date = new Date();
  var key = "leaderboard:" + date.getFullYear() + ":" + date.getWeek();
  return new Leaderboard(key, {}, global.redis);
}
