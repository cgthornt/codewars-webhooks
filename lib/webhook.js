var leaderboards = require('./leaderboards'),
    api = require('./api'),
    global = require('./global');

// If we wanted to get even more fancy, we could make some sort of "User" object,
// which we could then fetch from the ID from the webhook. For now, this will do
exports.userHonorUpgraded = function(user, cb) {

  // Fetch the user from the API
  api.fetchUser(user.id, function(apiUser) {

    // Update user in redis
    var key = "user:" + user.id;
    global.redis.set(key, JSON.stringify(apiUser), function(err) {
      if(err) {
        console.error("Unable to assign redis key '" + err + "'");
        throw err;
      }
      console.log('Successfully saved user %s (id: %s) into redis with key %s', apiUser.username, user.id, key);
    });

    // Update our leaderboard
    leaderboards.create().add(user.id, user.honor.toString(), function(err) {
      if(err) throw err;
      console.log('Successfully assigned user %s into leaderboard', user.id);
      if(cb) cb();
    });
  });
}

exports.parse = function(event, webhookBody, callback) {
  if(!event || event.trim().length == 0)
    return callback(new Error("No webhook event passed; ignoring."));
  if(!webhookBody)
    return callback(new Error("No webhook body passed; ignoring"));

  // Normally we could use some sort of event emitter. For now,
  // only listen to the user#rank_upgraded

  if(event != 'user')
    return callback(new Error("Currently we only support the 'user' event (not the '" + event + "' event)"));

  var action = webhookBody.action;
  if(action != 'honor_changed')
    return callback(new Error("We only support the user#honor_changed action (not the '" + action + "' action)"));

  exports.userHonorUpgraded(webhookBody.user);

  return callback(null);
}
