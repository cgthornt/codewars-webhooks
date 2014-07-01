var webhook = require('../../lib/webhook'),
    leaderboards = require('../../lib/leaderboards');

describe('webhook', function() {
  describe('#userHonorUpgraded', function() {
    it('creates an entry in the leaderboard', function() {
      webhook.userHonorUpgraded({ id: "3", honor: 4321});
      var board = leaderboards.create();
      board.score('3', function(err, score) {
        score.should.eq(4321);
      });
    });
  });
});
