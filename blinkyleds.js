var tessel = require('tessel');
var relaylib = require('relay-mono');


var TOGGLE_INTERVAL_SECONDS = 0.5;
var exports = module.exports;

var leds = {green: tessel.led[0], red: tessel.led[1]};
exports.leds = leds;

var toggleLeds = function(intervalSeconds){
  console.log("Toggling LED's!");
  intervalSeconds = intervalSeconds || TOGGLE_INTERVAL_SECONDS;
  var led1 = tessel.led[0].output(1);
  var led2 = tessel.led[1].output(0);
  setInterval(function(){
    led1.toggle();
    led2.toggle();
  }, intervalSeconds*1000);
};

var startToggling = function() {
  var relay = relaylib.use(tessel.port['A']);
  relay.on('ready', toggleLeds);
};

exports.startToggling = startToggling;