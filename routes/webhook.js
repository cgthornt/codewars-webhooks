var webhooks = require('../lib/webhook');

exports.index = function(req, res) {
  var event = req.get('X-Webhook-Event');

  // How to use the webhook secret - make sure that untrusted users do not tamper with your data
  var secret = process.env.WEBHOOK_SECRET;
  if(secret && req.get('X-Webhook-Secret') != secret) {
    console.error("Passed webhook secret does not match process.env.WEBHOOK_SECRET!");
    return res.status(403).send('Invalid secret');
  }

  webhooks.parse(event, req.body, function(err) {
    if(err)
      console.error(err.toString());
    else
      console.log('Executed webhook event "' + event + "' with body :", req.body);
  });
  res.status(204).send(''); // Empty body - webhooks don't care
}
