var webhook = require('../../lib/webhook'),
    leaderboards = require('../../lib/leaderboards');

describe('webhook', function() {
  describe('#userHonorUpgraded', function() {
    it('creates an entry in the leaderboard', function(done) {
      var userId = "5355e732d6728d5ca7000068";
      webhook.userHonorUpgraded({ id: userId, honor: 4321}, function() {
        var board = leaderboards.create();
        board.score(userId, function(err, score) {
          score.should.eq(4321);
          done();
        });
      });
    });
  });
});
