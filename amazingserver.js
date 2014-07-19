/*
This server tries connecting to wifi and:
if it can't connect at all, light up red light
if it can connect:
  if it's too slow, light up both lights
  if it's ok, light up green lights
*/

var once = require('once')
var wifi = require('wifi-cc3000');
var led = require('tessel-led');
var timer = require('./timer.js');

var wifiSettings = {
  ssid: 'Hack Reactor',
  password: 'awesomebullets',
  // security: 'wpa2',
  // timeout: 30
}
, connectionCheckIntervalId = null;

var startCheckingConnectionSpeed = function() {
  connectionCheckIntervalId = setInterval(function() {
    if (timer.connectionSpeedSucks()) {
      console.log('connection speed sucks!')
      // turn both on
      led.red.show();
      led.green.show();
    } else {
      console.log('connection speed is good!')
      led.red.hide()
      led.green.show();
    }
  }, 4000);
};

var startConnectionCheck = once(function(err, res) {
  console.log('startConnectionCheck called')
  if (err) {
    led.green.hide();
    led.red.show();
    console.log('ERROR:', err);
  } else {
    startCheckingConnectionSpeed()
  }
});

function tryConnect() {
  if (wifi.isConnected()) {
    startConnectionCheck(null, wifi.connection())
  } else {
    if (!wifi.isBusy()) {
      console.log("not busy");
      console.log('trying to connect')
      wifi.connect(wifiSettings, startConnectionCheck);
    } else {
      console.log("is busy, trying again");
      setTimeout(function() {
        tryConnect();
      }, 1000);
    }
  }
}

wifi.on('connect', function(error) {
  console.log('wifi connected!')
  if (error) console.log('Wifi connection error:', error)
  // start looping to check connection
  startConnectionCheck(null, wifi.connection())
});

wifi.on('disconnect', function(error) {
  console.log('wifi disconnected!')
  if (error) console.log('Wifi disconnection error:', error)
  // kill loop
  clearInterval(connectionCheckIntervalId);
  // try to connect again
  // tryConnect()
});

console.log('loading stuff');
setTimeout(function() {
  if (!wifi.isConnected()) {
    tryConnect()
  } else if (wifi.isConnected()) {
    startConnectionCheck(null, wifi.connection())
  }
}, 10000)

