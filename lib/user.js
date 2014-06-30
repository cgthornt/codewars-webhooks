var sqlite3 = require('sqlite3').verbose(),
    db = new sqlite3.Database('db/codewars.sqlite3'),
     _ = require('underscore');

// We could eventually move these DB functions into some sort of model.
exports.updateOrCreate = function(user, callback) {

  var onlyFields = ['id', 'honor'];

  // The idea is to update or create a user in our database. We will dynamically
  // generate the SQL based upon the user object we receive so we can easily
  // accommodate new user fields.

  user = _.pick(user, onlyFields);

  var fields = [];
  var values = [];
  _.each(user, function(value,key) {
    fields.push(key);
    values.push(value);
  });

  var fieldsSql = fields.map(function(field) { return '"' + field + '"'; }).join(", ");
  var valuesSql = fields.map(function() { return "?"; }).join(", ");
  var sql = 'REPLACE INTO "users" (' + fieldsSql + ') VALUES (' + valuesSql + ')';

  db.run(sql, values, function(err) {
      if(err) throw err;
      if(callback) callback();
    });
}

exports.topUsers = function(limit, callback) {
  var sql = 'SELECT "id", "rank" FROM "users" ORDER BY "rank" DESC LIMIT $lim';
  db.all(sql, {$lim: limit}, function(err, rows) {
     if(err) throw err;
     callback(rows);
  });
}
