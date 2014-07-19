/*
This server tries connecting to wifi and:
if it can't connect at all, light up red light
if it can connect:
  if it's too slow, light up both lights
  if it's ok, light up green lights
*/

var subprocess = require('child_process');
var led = require('tessel-led');
var tessel = require('tessel-client');
var env = process.env;
var timer = require('./timer.js');


var startCheckingConnectionSpeed = function() {
  setInterval(function() {
    if (timer.connectionSpeedSucks()) {
      // turn both on
      led.red.show();
      led.green.show();
    }
    else {
      led.red.hide()
      led.green.show();
    }
  }, 4000);
};


console.log('loading stuff');
led.green.flash(3, 100, 100, function(){
  var client = tessel.connect(8080, 'localhost');
  client.configureWifi('Hack Reactor', 'awesomebullets', 'wpa2', opts, function(err, status){
    if (stderr) {
      // solid red if it's just not working at all
      led.green.hide();
      led.red.show();
    }
    else {
      // check connection speed in a loop
      startCheckingConnectionSpeed();
    }
  });
});
