var express = require('express'),
    app = express(),
    router = express.Router(),
    bodyParser = require('body-parser');

var webhookRoute = require('./routes/webhook'),
    welcomeRoute = require('./routes/welcome');

app.set('view engine', 'jade');
app.set('views', __dirname + '/views');

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use('/', router);

router.get('/', welcomeRoute.index);
router.post('/webhook', webhookRoute.index);

var port = process.env.PORT || 3000;
var server = app.listen(port, function() {
  console.log('Listening on port %d. Powered by Express', server.address().port);
});
