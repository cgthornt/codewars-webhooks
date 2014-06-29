var express = require('express'),
    app = express(),
    router = express.Router(),
    bodyParser = require('body-parser');

var webhooks = require('./lib/webhook');

app.set('view engine', 'jade');
app.set('views', __dirname + '/views');

app.use(bodyParser.json());
app.use('/', router);

router.get('/', function(req, res) {
  res.render('index');
});

router.post('/webhook', function(req, res) {
  var event = req.get('X-Webhook-Event');
  webhooks.parse(event, req.body, function(err) {
    if(err)
      console.error(err.toString());
    else
      console.log('Executed webhook event "' + event + "' with body :", req.body);
  });
  res.status(204).send(''); // Empty body - webhooks don't care
});

var server = app.listen(3000, function() {
  console.log('Listening on port %d. Powered by Express', server.address().port);
});
