// require('dotenv').config({path:__dirname+'../.env'})
var HTTPS = require('https');

var botID = process.env.BOT_ID;

// var botID = '5fdff496ef5e210bb66befa88c';

var date = new Date();

function postMessage() {
  var botResponse, options, body, botReq;

  botResponse = 'sign the form 1 please';

  options = {
    hostname: 'api.groupme.com',
    path: '/v3/bots/post',
    method: 'POST'
  };

  body = {
    "bot_id" : botID,
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

function postMessage2() {
  var botResponse, options, body, botReq;

  botResponse = 'like for boxed lunches';

  options = {
    hostname: 'api.groupme.com',
    path: '/v3/bots/post',
    method: 'POST'
  };

//  var botID = '5fdff496ef5e210bb66befa88c' // wack ass method

  body = {
    "bot_id" : '8b672c3b569a3771b1a3272d53', // change to LunchBot botID after test tonight
    "text" : botResponse
  };

  console.log('sending ' + botResponse + ' to ' + botID);

  botReq = HTTPS.request(options, function(res) {
      if(res.statusCode == 202) {
        // neat
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

if (date.getDay != 5 && date.getDay!= 4) {
  postMessage2();
}

postMessage();
