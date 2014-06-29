var express = require('express'),
    app = express(),
    router = express.Router(),
    bodyParser = require('body-parser');

var webhooks = require('./lib/webhook');

app.set('view engine', 'jade');
app.set('views', __dirname + '/views');

app.use('/', router);
app.use(bodyParser.json())

router.get('/', function(req, res) {
  res.render('index');
});

router.post('/webhook', function(req, res) {
  webhooks.parse(req.get('X-Webhook-Event'), req.body);
  console.log("Hello!");
  res.status(204).send(''); // Empty body - webhooks don't care
});

var server = app.listen(3000, function() {
  console.log('Listening on port %d. Powered by Express', server.address().port);
});
