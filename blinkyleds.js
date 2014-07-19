var tessel = require('tessel');
var relaylib = require('relay-mono');


var TOGGLE_INTERVAL_SECONDS = 0.5;


var relay = relaylib.use(tessel.port['A']);
relay.on('ready', function(){
  console.log("Toggling LED's!");
  var led1 = tessel.led[0].output(1);
  var led2 = tessel.led[1].output(0);
  setInterval(function(){
    led1.toggle();
    led2.toggle();
  }, TOGGLE_INTERVAL_SECONDS*1000);
});
