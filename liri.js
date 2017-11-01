var keys = require('./key.js');
var consumer_key = keys.consumer_key;
var consumer_secret = keys.consumer_secret;
var access_token_key = keys.access_token_key;
var access_token_secret = keys.access_token_secret;

var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var request = require('request');
var fs = require('fs');

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

var args = process.argv.slice(2);
command(args);
//Do some input processing

function command(arguments) {
	var params = {};
	switch(arguments[0]) {
		case 'my-tweets':
			params = {
				screen_name: 'GusGusnguyen',
				count: 20
			};
			client.get('statuses/user_timeline', params)
				.then(tweet => {
					tweet.forEach(value => {
						console.log(value.text);
					})
				})
				.catch(error => {
					console.log(error);
				}) 
			break;
		case 'spotify-this-song':
			params = {
				type: 'track',
				query: arguments[1]
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
			break;
		case 'movie-this':
			var queryURL = 'http://www.omdbapi.com/?apikey=40e9cece&t=';
			queryURL += arguments[1];
			request(queryURL, (error, response, body) => {
				// console.log(response);
				body = JSON.parse(body);
				// console.log(error);
				var title = body.Title;
				var year = body.Year;
				var imdb_rating = body.imdbRating;
				var rotten_rating = body.Ratings[1].Value;
				var country = body.Country;
				var language = body.Language;
				var plot = body.Plot;
				var actors = body.Actors;

				var output = {
					title: title,
					year: year,
					imdb_rating: imdb_rating,
					rotten_rating: rotten_rating,
					country: country,
					language: language,
					plot: plot,
					actors: actors
				}
				console.log(output);
			});
			break;
		case 'do-what-it-says':
			fs.readFile('random.txt', 'utf8', (error, data) => {
				var input = data.trim().split(',');
				command(input);

			});
			break;
		default:
			break;
	}
}
// client.get('statuses/user_timeline', params)
// 	.then(tweet => {
// 		tweet.forEach(value => {
// 			console.log(value.text);
// 		})
// 	})
// 	.catch(error => {
// 		console.log(error);
// 	}) 
// params = {
// 	type: 'track',
// 	query: 'All Of The Lights'
// };
// spotify.search(params)
// 	.then(response => {
// 		response = response.tracks.items[0];
// 		var artists = response.artists;
// 		artists.forEach(artist => {
// 			console.log(artist.name);
// 		});
// 		var name = response.name;
// 		var preview = response.preview_url;
// 		var album = response.album.name;
// 		console.log(name + ' ' + preview + ' ' + album);

// 	})
// 	.catch(error => {
// 		console.log(error);
// 	})

// var queryURL = 'http://www.omdbapi.com/?apikey=40e9cece&t=Mulan';

// request(queryURL, (error, response, body) => {
// 	// console.log(response);
// 	body = JSON.parse(body);
// 	// console.log(error);
// 	var title = body.Title;
// 	var year = body.Year;
// 	var imdb_rating = body.imdbRating;
// 	var rotten_rating = body.Ratings[1].Value;
// 	var country = body.Country;
// 	var language = body.Language;
// 	var plot = body.Plot;
// 	var actors = body.Actors;

// 	var output = {
// 		title: title,
// 		year: year,
// 		imdb_rating: imdb_rating,
// 		rotten_rating: rotten_rating,
// 		country: country,
// 		language: language,
// 		plot: plot,
// 		actors: actors
// 	}
// 	console.log(output);
// });
