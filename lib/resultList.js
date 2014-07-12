/**
 * Returns a result list using the magic of Q and whatnot
 */

var Q = require('q'),
  leaderboards = require('./leaderboards'),
  global = require('./global');


var squishLeaderboard = function(list, callback) {
  var results = [];
  if(list.length == 0)
    return callback(results);
  for(i = 0; i < list.length; i++) {
    buildLeaderboard(i, list[i], function(err, user, listIndex, listItem) {
      if(!err && user) {
        results.push({
          user: user,
          ranking: listItem
        });
      }
      if(listIndex == list.length - 1)
        callback(results);
    });
  }
}

var buildLeaderboard = function(listIndex, listItem, callback) {
  var key = 'user:' + listItem.member;
  console.log('Fetching redis key %s', key);
  global.redis.get(key, function(err, res) {
    if(err) {
      console.error('Error fetching redis key %s!', key);
      return callback(err, null, listIndex, listItem);
    }

    if(!res) {
      console.error('No user data contained for key %s, ignoring.', key);
      return callback(null, null, listIndex, listItem);
    }

    callback(null, JSON.parse(res), listIndex, listItem);
  });
}



exports.getResults = function(relativeTime) {
  var deferred = Q.defer();
  leaderboards.create(/* relativeTime */).list(function(err, list) {
    squishLeaderboard(list, function(results) {
      deferred.resolve(results);
    });
  });

  return deferred.promise;
}
