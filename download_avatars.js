var request = require('request');
var secret = require('./secrets.js');

console.log("Welcome to the GitHub Avatar Downloader!");

function getRepoContributors(repoOwner, repoName, cb) {
  var options = {
    url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
    headers: {
      'User-Agent': 'request',
      'Authorization': 'secret.GITHUB_TOKEN'
    }
  };

  request(options, function(err, res, body) {
    cb(err, body);
    var json = JSON.parse(body);
    var avatarURL = [];
    for (var i in json) {
      avatarURL.push(json[i].avatar_url);
    }
    // console.log(avatarURL);
    cb(err, avatarURL);
  });
}

getRepoContributors("jquery", "jquery", function(err, result) {
  console.log("Errors: ", err);
  console.log("Result: ", result);
});