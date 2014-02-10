var net = require('net');

// Mock sensors
var mockSensors = [
	{ sensor: 'temperature', maxValue: 30, unit: 'C' },
	{ sensor: 'distance', maxValue: 10, unit: 'm' },
	{ sensor: 'light', maxValue: 15, unit: 'Ω' },
	{ sensor: 'air_quality', maxValue: 10, unit: 'R' }
];

// Create TCP connection
var client = net.connect({port: 5432, host: '127.0.0.1'}, function() {
  console.log('connected');

  sendRandomData(client);
});

client.on('end', function() {
  console.log('disconnected');
});

// send random streams of data
function sendRandomData(client) {
	var time = Math.floor(Math.random() * 2500);

	setTimeout(function() {
		var sensor = mockSensors[Math.round(Math.random() * 3)];
		sensor.value = Math.floor(Math.random() * sensor.maxValue);

		client.write(JSON.stringify(sensor, ["sensor", "value", "unit"]) + "\n");

		sendRandomData(client);
	}, time);
};