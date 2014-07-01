var leaderboards = require('../../lib/leaderboards'),
    Leaderboard  = require('leaderboard');

describe('leaderboards', function() {
  describe('#leaderboard', function() {
    it('returns a Leaderboard object', function() {
      var leaderboard = leaderboards.create();
      leaderboard.should.be.an.instanceOf(Leaderboard);
    });

    it('gives a correct name from a Date object', function() {
      var date = new Date(1404186873 * 1000); // Monday, Jun 30 2014
      var leaderboard = leaderboards.create(date);
      leaderboard.name.should.eq("leaderboard:2014:27");
    });
  });
});
