var webhooks = require('./../lib/webhook');

exports.index = function(req, res) {
  webhooks.topUsers(10, function(rows) {
    res.render('index', { leaderboard: rows });
  });
}
