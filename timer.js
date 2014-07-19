var http = require('http');


var getElapsedSeconds = function(now, old) {
  return (now - old) / 1000;
};

/**
 * Makes an http request, and returns whether it took too long
*/
var requestLengthSucks function(maxLength) {
  maxLength = maxLength || 2;
  var startTime = new Date();
  makeRequest(function(result){
    if (result.error) {
      console.log(result.error);
      return true;
    }
    else {
      var elapsedSeconds = getElapsedSeconds(result.now, startTime);
      console.log(elapsed);
      return elapsedSeconds > maxLength;
    }
  });
};

var makeRequest = function(cb) {
  http.get('http://httpstat.us/200', function(res){
    res.on('end', function(){
      cb({now: new Date(), err: null});
    });
  })
  .on('error', function(err){
    cb({now: new Date(), err: err});
  });
};
