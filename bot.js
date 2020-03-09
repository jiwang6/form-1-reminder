var HTTPS = require('https');

var botID = process.env.BOT_ID;

// var botID = '5fdff496ef5e210bb66befa88c';

var date = new Date();

function respond() {
  var request = JSON.parse(this.req.chunks[0]),
      botRegex = /^\/meals$/;

  if (request.text && botRegex.test(request.text)) { 
    this.res.writeHead(200);
    setInterval(postMessage(),10000);
    this.res.end();
  } else {
    console.log("don't care");
    this.res.writeHead(200);
    this.res.end();
  }
}

function postMessage() {
  var botResponse, options, body, botReq;

  botResponse = 'https://drive.google.com/file/d/1ParNegKTHfQFbgfcBWuw-ZwT6vtsVyMt/view?usp=sharing';

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


exports.respond = respond;

