var request = require('request');
var secret = require('./secrets.js');
var fs = require('fs');

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
    cb(err, avatarURL);
  });
}

function downloadImageByURL(url, filePath) {
  request.get(url)
    .on('error', function (err) {
      throw err;
    })
    .on('response', function (response) {
      console.log('Response Status Code: ', response.statusCode, '\nContent Type: ', response.headers['content-type'], '\nDownloading image...');
    })
    .pipe(fs.createWriteStream(filePath))
}

// downloadImageByURL("https://avatars2.githubusercontent.com/u/2741?v=3&s=466", "avatars/kvirani.jpg");

getRepoContributors("jquery", "jquery", function(err, result) {
  console.log("Errors: ", err);
  console.log("Result: ", result);
});