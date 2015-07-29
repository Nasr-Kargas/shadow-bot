var Response;
var shouldRespond = true
var SebResponder = require('./users/seb_responses.js');
var NasrResponder = require('./users/nasr_responses.js');

Response = (function() {

	Response.prototype.respondToMessage = function(message, userName, userObject, botMaster) {

		console.log("respondToMessage() - " + message);

		var text, response;
		text = message.text.toLowerCase();
    if(userObject.is_bot){
      response = "Dont listen to " + userObject.name + " I think it's a bot!"
    }
		else if (userName == botMaster) {
			sebResponder = new SebResponder();
			response = sebResponder.respondToText(text);
  		}
      var shouldTurnOff = false
      if(text=="ralf off"){
        response = "Ralf out!";
        shouldTurnOff = true;
      }
      if(text=="ralf on"){
        response = "Heyoooo!";
        shouldTurnOff = false;
        shouldRespond = true;
      }

  		if (~text.indexOf("ahaha")) {
  			response = "what the fuck is so funny?";
  		}
  		if (~text.indexOf("coffee")) {
  			response = "do you do any work, or do you just drink coffee?";
  		}
  		if (~text.indexOf("ded")) {
  			response = "shutup, you're not dead.";
  		}
  		if (~text.indexOf("gay")) {
  			response = "are you trying to tell us something?";
  		}
  		if (~text.indexOf("fuck")) {
  			response = "that language is offensive, try and find another word to use instead of fuck.";
  		}

  		if (response != null) {
  			var formattedResponse = "<@" + message.user + ">: " + response;
        if(shouldTurnOff){
          shouldRespond = false
          return formattedResponse;
        }else{
          if(shouldRespond){
            return formattedResponse;
          }
        }
  		};

	};

});

module.exports = Response;