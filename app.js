var ecoBotServer = require('./lib/ecoBot.js');

var ecoBot = new ecoBotServer(5432);

ecoBot.on('sensor', function(data) {
	console.dir(data);
});