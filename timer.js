var http = require('http');


var getElapsedSeconds = function(now, old) {
  return (now - old) / 1000;
};

/**
 * Makes an http request, and returns whether it took too long
*/
var requestLengthSucks function(maxSeconds) {
  maxLength = maxLength || 2;
  var startTime = new Date();
  makeRequest(maxSeconds, function(result){
    if (result.error) {
      console.log(result.error);
      return true;
    }
    else {
      var elapsedSeconds = getElapsedSeconds(result.now, startTime);
      console.log(elapsed);
      return elapsedSeconds > maxSeconds;
    }
  });
};

var makeRequest = function(maxSeconds, cb) {
  var done = false;

  // if we are waiting longer than the maxSeconds anyway, run the cb
  setTimeout(function(){
    if (!done) {
      cb({now: new Date(), err: null});
    }
  }, maxSeconds*1000 + 1);

  http.get('http://httpstat.us/200', function(res){
    res.on('end', function(){
      done = true;
      cb({now: new Date(), err: null});
    });
  })
  .on('error', function(err){
    done = true;
    cb({now: new Date(), err: err});
  });
};
