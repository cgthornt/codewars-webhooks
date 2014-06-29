var sqlite3 = require('sqlite3').verbose(),
    db = new sqlite3.Database('db/codewars.sqlite3');

// We could eventually move these DB functions into some sort of model.
exports.findOrUpdate = function(user, callback) {
  db.run('REPLACE INTO "users" ("id", "rank") VALUES ($id, $rank)',
    { $id: user.id, $rank: user.rank },
    function(err) {
      if(err) throw err;
      if(callback) callback();
    });
}

exports.topUsers = function(limit, eachUser) {
  db.each('SELECT "id", "rank" FROM "users" ORDER BY "rank" ASC LIMIT $lim',
    {$lim: limit},
    function(err, row) {
     if(err) throw err;
     eachUser(row);
  });
}
