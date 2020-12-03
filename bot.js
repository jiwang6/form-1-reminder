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

var jokes= ['There are 16 kinds of people in the world: those who understand hexidecimal, those who don’t, and F the rest.',
            'Why did the programmer quit his job? Because he didnt get arrays.',
            'How can you tell if a computer geek is an extrovert? They stare at your shoes when you talk instead of their own.',
            'If at first you dont succeed call it version 1.0',
            'Never trust atoms; they make up everything!',
            'You gotta hand it to short people ... because they can’t reach it.',
            'The thief that stole my iPhone should Face-Time.',
            'I sold my vaccuum clearner today; all it was doing was collecting dust.',
            'Why do bees have sticky hair? Because they use honeycombs.',
            'My wife emailed me pictures of my wedding but I couldn’t open the files. I always have trouble with emotional attachments.',
            '\"I will get an A in 350\"',
            'Last night, I had a dream that I weighed less than a thousandth of a gram... I was like, 0mg.',
            'My friend said he couldn’t afford to pay his huge water bill. I sent him a \"Get Well Soon!\" card.',
            'Did you know ... you can actually listen to the blood in your veins? You just have to listen varicose-ly',
            'I\'ve got this weird fetish for figuring things out. As a matter of fact, I just came to that realization.',
            'I wanted to study Computer Science but then I stopped... Turns out its just a sudo science.'
           ]

function newJoke(){
  var randomNumber=Math.floor(Math.random()*(20));
  return jokes[randomNumber];
}

function getJoke() {
  // make an API request to https://icanhazdadjoke.com/'
  fetch('https://icanhazdadjoke.com/', {
    headers: {
      'Accept': 'application/json'
    }
  }).then(function(response) {
    /* convert Stringified JSON response to Javascript Object */
    return response.json();
  }).then(function(data) {
    /* replace innerText of .joke-text with data.joke */
    // extract the joke text
    const joke = data.joke;
    // do the replacement
    return joke;

  }).catch(function(error) {
    // if some error occured
    console.log(error);
  });
}

exports.respond = respond;
