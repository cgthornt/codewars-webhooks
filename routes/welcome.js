var resultList = require('./../lib/resultList');
require('date-utils');




exports.index = function(req, res) {
  var today = Date.today();
  var currentWeek = req.query.date ? new Date(parseInt(req.query.date)) : today,
      nextWeek = currentWeek.getTime() + (604800 * 1000),
      lastWeek = currentWeek.getTime() - (604800 * 1000);


  resultList.getResults(currentWeek).then(function(resultList) {
    res.render('index', {
      leaderboard: resultList,
      currentWeek: currentWeek,
      nextWeek: nextWeek,
      lastWeek: lastWeek,
      today: today
    });
  });
}
