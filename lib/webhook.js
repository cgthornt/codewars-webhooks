

exports.parse = function(event, webhookBody) {
  if(!event || event.trim().length == 0)
    return console.error("No webhook event passed; ignoring.");
  if(!webhookBody)
    return console.error("No webhook body passed; ignoring");

  // TODO: figure out what to do with our newly created webhook!
}
