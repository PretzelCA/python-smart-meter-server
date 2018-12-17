// server.js
// where your node app starts

// init project
const express = require('express');
const app = express();
const jsonfile = require('jsonfile')
const userData = './data.json'

app.get('/', function(request, response) {
  response.send(`Hello World! There is nothing here. Maybe you're looking for the api?`)
});

app.get('/api/', function(request, response) {
  response.send('200') // Responds to health check
});

app.get('/api/getUserInfo/:userId', function(request, response) {
  jsonfile.readFile(userData, function (err, obj) {
  if (err) console.error(err)
    response.send(obj.params) // Leaks database, oh nooooooo
  })});

app.get('/api/leakUserInfo', function(request, response) {
  jsonfile.readFile(userData, function (err, obj) {
  if (err) console.error(err)
    response.send(obj) // Leaks database, oh nooooooo
  })
});

// listen for requests :)
const listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});
