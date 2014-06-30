var User = require('./user');

// If we wanted to get even more fancy, we could make some sort of "User" object,
// which we could then fetch from the ID from the webhook. For now, this will do
function userHonorUpgraded(user) {
  User.findOrCreate(user);
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

  userHonorUpgraded(webhookBody.user);

  return callback(null);
}

exports.topUsers = User.topUsers;
