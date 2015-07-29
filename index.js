// Setting up litlte HTML sesh, just to show it is alive...
var express = require('express');
var app = express();
var botMaster = "@nasrkargas";
var shouldTalk = true;
var bot = Bot();

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

app.get('/', function(request, response) {
    response.render('index.html');
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});


// Slack Bot about to start.
var Slack, autoMark, autoReconnect, slack, token, Responder;
Responder = require('./response.js')
Bot = require('./bot.js')
Slack = require('slack-client')
token = 'xoxb-8298166273-NFuOWpXMH2UYr8qT8IuzSq8i'
autoReconnect = true;
autoMark = true;
slack = new Slack(token, autoReconnect, autoMark);

slack.on('open', function() {
  console.log('alive');
});

slack.on('message', function(message) {

	var channel, channelError, channelName, errors, responder, text, textError, ts, type, typeError, user, userName;

	console.log('slackMessage() - ' + message);

	channel = slack.getChannelGroupOrDMByID(message.channel);
	user = slack.getUserByID(message.user);
	type = message.type;
	text = message.text.toString().toLowerCase();
	ts = message.ts;
  	channelName = (channel != null ? channel.is_channel : void 0) ? '#' : '';
  	channelName = channelName + (channel ? channel.name : 'UNKNOWN_CHANNEL');
  	userName = (user != null ? user.name : void 0) != null ? "@" + user.name : "UNKNOWN_USER";
  	console.log("Received: " + type + " " + channelName + " " + userName + " " + ts + " \"" + text + "\"");

  	if (type === 'message' && (text != null) && (channel != null) && (slack.self.name != userName)) {

  		responder = new Responder();
  		var response = responder.respondToMessage(message, userName, user, botMaster);
      var response2 = bot.processMessage(message, user);
  		if (response2 != null && shouldTalk) {
  			channel.send(response2);
  			return console.log("@" + slack.self.name + " responded with \"" + response2 + "\"");
  		} 

	} else {
    	typeError = type !== 'message' ? "unexpected type " + type + "." : null;
    	textError = text == null ? 'text was undefined.' : null;
    	channelError = channel == null ? 'channel was undefined.' : null;
    	errors = [typeError, textError, channelError].filter(function(element) {
      		return element !== null;
    }).join(' ');
		return console.log("@" + slack.self.name + " could not respond. " + errors);
  }


});

slack.on('error', function(error) {
  return console.error("Error: " + error);
});

slack.login();