// Global stuff (i.e. redis)

console.log("THE ENVIRONMENT", process.env);
if (process.env.REDISTOGO_URL) {
  var rtg   = require("url").parse(process.env.REDISTOGO_URL);
  exports.redis = require("redis").createClient(rtg.port, rtg.hostname);
  exports.redis.auth(rtg.auth.split(":")[1]);
} else {
  exports.redis = require("redis").createClient();
}
