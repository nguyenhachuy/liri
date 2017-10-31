var twitter = require('./key.js');
var consumer_key = twitter.consumer_key;
var consumer_secret = twitter.consumer_secret;
var access_token_key = twitter.access_token_key;
var access_token_secret = twitter.access_token_secret;

var Twitter = require('twitter');

var client = new Twitter({
	consumer_key: consumer_key,
	consumer_secret: consumer_secret,
	access_token_key: access_token_key,
	access_token_secret: access_token_secret
});

console.log(process.argv);
var args = process.argv.slice(2);


var params = {
	screen_name: 'GusGusnguyen',
	count: 20
}
client.get('statuses/user_timeline', params)
	.then(tweet => {
		tweet.forEach(value => {
			console.log(value.text);
		})
	})
	.catch(error => {
		console.log(error);
	}) 