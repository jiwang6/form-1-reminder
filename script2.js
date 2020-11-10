var HTTPS = require('https');


var botID = '8b672c3b569a3771b1a3272d53';

var date = new Date();

function postMessage() {
  var botResponse, options, body, botReq;

  botResponse = 'like for boxed lunches';

  options = {
    hostname: 'api.groupme.com',
    path: '/v3/bots/post',
    method: 'POST'
  };

  body = {
    "bot_id" : '5fdff496ef5e210bb66befa88c',
    "text" : botResponse
  };

  console.log('sending ' + botResponse + ' to ' + botID);

  botReq = HTTPS.request(options, function(res) {
      if(res.statusCode == 202) {
        //neat
      } else {
        console.log('rejecting bad status code ' + res.statusCode);
      }
  });

  botReq.on('error', function(err) {
    console.log('error posting message '  + JSON.stringify(err));
  });
  botReq.on('timeout', function(err) {
    console.log('timeout posting message '  + JSON.stringify(err));
  });
  botReq.end(JSON.stringify(body));
}

if (date.getDay !=5 || date.getDay!=6) {
  postMessage();
}
