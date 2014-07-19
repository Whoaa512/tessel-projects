// Any copyright is dedicated to the Public Domain.
// http://creativecommons.org/publicdomain/zero/1.0/

/*********************************************
This relay module demo toggles both relay
channels every two seconds, logging the new
values to the console upon latching.
*********************************************/

var tessel = require('tessel');
var relaylib = require('relay-mono');

var relay = relaylib.use(tessel.port['A']);

var led1 = tessel.led[0].output(1);
var led2 = tessel.led[1].output(0);


relay.on('ready', function(){
  console.log('Ready! Toggling relays...');

  var toggleIntervalSeconds = 0.5;
  setInterval(function(){
    led1.toggle();
    led2.toggle();
  }, toggleIntervalSeconds*1000);
});

// When a relay channel is set, it emits the 'latch' event
relay.on('latch', function(channel, value) {
  console.log('latch on relay channel ' + channel + ' switched to', value);
});
