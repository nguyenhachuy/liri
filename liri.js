var keys = require('./key.js');
var consumer_key = keys.consumer_key;
var consumer_secret = keys.consumer_secret;
var access_token_key = keys.access_token_key;
var access_token_secret = keys.access_token_secret;

var Twitter = require('twitter');
var Spotify = require('node-spotify-api');

var client = new Twitter({
	consumer_key: consumer_key,
	consumer_secret: consumer_secret,
	access_token_key: access_token_key,
	access_token_secret: access_token_secret
});

var spotify = new Spotify({
	id: 'ba1c7a8e08a84fa4ad7b70759f61cd64',
	secret: 'f7cfa5010d9d40df91e459cf151d4975'
});

console.log(process.argv);
var args = process.argv.slice(2);


var params = {
	screen_name: 'GusGusnguyen',
	count: 20
};
// client.get('statuses/user_timeline', params)
// 	.then(tweet => {
// 		tweet.forEach(value => {
// 			console.log(value.text);
// 		})
// 	})
// 	.catch(error => {
// 		console.log(error);
// 	}) 
params = {
	type: 'track',
	query: 'All Of The Lights'
};
spotify.search(params)
	.then(response => {
		response = response.tracks.items[0];
		var artists = response.artists;
		artists.forEach(artist => {
			console.log(artist.name);
		});
		var name = response.name;
		var preview = response.preview_url;
		var album = response.album.name;
		console.log(name + ' ' + preview + ' ' + album);

	})
	.catch(error => {
		console.log(error);
	})