var Client = new require('node-rest-client').Client;
var client = new Client;


exports.fetchUser = function(userId, callback) {
  var url = "https://codewars.com/api/v1/users/" + userId + ".json";
  console.log('Executing GET ' + url + '...');
  client.get(url, function(data, response) {
    console.log('Execution complete with HTTP ', response.statusCode);
    if(response.statusCode != 200)
      return console.err('Execution did not result in 200 status code - aborting!');
    callback(JSON.parse(data));
  });
}
