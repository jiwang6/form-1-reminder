var HTTPS = require('https');

//var botID = process.env.BOT_ID;

var botID = '8b672c3b569a3771b1a3272d53';

var date = new Date();

function respond() {
  var request = JSON.parse(this.req.chunks[0]),
      botRegex = /^\/ahaha$/;

  if (request.text && botRegex.test(request.text)) { 
    this.res.writeHead(200);
    postMessage();
    this.res.end();
  } else {
    console.log("don't care");
    this.res.writeHead(200);
    this.res.end();
  }
}

function postMessage() {
  var botResponse, options, body, botReq;

  botResponse = newJoke();

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

var jokes= ['Guess the number of programmers it takes to change a light bulb? Zero its a hardware problem','There are only 10 kinds of people in this world: those who know binary and those who don’t.','Real programmers count from 0.', 'Why did the programmer quit his job? Because he didnt get arrays.', 'A foo walks into a bar takes a look around and says Hello World','0 is false 1 is true right? 1','Things arent always #000000 and #FFFFFF.','What is the most used language in programming? Profanity','!False its funny because its True','You had me at Hello World','2b||!2b','Yesterday I changed the name on my wifi to Hack if you can. Today I found it named Challenge Accepted','A programmer is a person who fixed a problem that you didnt know you had in a way you dont understand','How can you tell if a computer geek is an extrovert? They stare at your shoes when you talk instead of their own.','I would love to change the world but they wont give me the source code.','If at first you dont succedd call it version 1.0','Computers make very fast very accurate mistakes','I farted in the Apple store and everyone got mad at me. Not my fault they dont have Windows.','Knock Knock... Whos there? Art... Art Who? R2D2','Hilarious and amazingly true thing: if a pizza has a radius (z) and a depth (a) that pizzas volume can be defined Pi*z*z*a.']

function newJoke(){
  var randomNumber=Math.floor(Math.random()*(20));
  return jokes[randomNumber];
}


exports.respond = respond;
