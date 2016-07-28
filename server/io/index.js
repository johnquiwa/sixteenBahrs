'use strict';
var path = require('path');
var socketio = require('socket.io');
var io = null;
var SPOTIFY_PATH = path.join(__dirname, '../env/production.js');
var SPOTIFY = require(SPOTIFY_PATH)["SPOTIFY"];
var client_id = SPOTIFY["clientID"];
var client_secret = SPOTIFY["clientSecret"];

module.exports = function (server) {

    if (io) return io;

    io = socketio(server);

    io.on('connection', function (socket) {
    	console.log('connected');
    	console.log(client_id)
        // Now have access to socket, wowzers!
        var request = require('request');

				var authOptions = {
				  url: 'https://accounts.spotify.com/api/token',
				  headers: {
				    'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
				  },
				  form: {
				    grant_type: 'client_credentials'
				  },
				  json: true
				};

				request.post(authOptions, function(error, response, body) {
					console.log(response);
	        if (!error && response.statusCode === 200) {

	            // use the access token to access the Spotify Web API
	            var token = body.access_token;
	            var options = {
	              url: 'https://api.spotify.com/v1/audio-analysis/4B0JvthVoAAuygILe3n4Bs',
	              headers: {
	                'Authorization': 'Bearer ' + token
	            },
	            json: true
	            };
	            request.get(options, function(error, response, body) {
	              console.log(body);
	              socket.emit('analysis', body)
	            });
	        }
	    	});
    });
    
    return io;

};
