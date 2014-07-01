var leaderboards = require('../lib/leaderboards');
require('date-utils');

exports.index = function(req, res) {
  var today = Date.today();
  var currentWeek = req.query.date ? new Date(parseInt(req.query.date)) : today,
      nextWeek = currentWeek.getTime() + (604800 * 1000),
      lastWeek = currentWeek.getTime() - (604800 * 1000);

  leaderboards.create(currentWeek).list(function(err, list) {
    res.render('index', {
      leaderboard: list,
      currentWeek: currentWeek,
      nextWeek: nextWeek,
      lastWeek: lastWeek,
      today: today
    });
  });
}
