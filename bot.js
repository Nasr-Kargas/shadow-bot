BotBrain = require('./botBrain.js');

var RalfBot = (function() {
    this.botName = "ralf";
    this.botCommandOne = this.botName + " please";
    this.botCommandTwo = this.botName;
    this.botCommandPhrases = [this.botCommandOne, this.botCommandTwo];
    this.brain = new BotBrain();

	RalfBot.prototype.processMessage = function(message, user){
		console.dir(message);
		commandText = message.text.toLowerCase().trim();
		var beingCommanded = false;
		for (var i = this.botCommandPhrases.length - 1; i >= 0; i--) {
			var phrase = this.botCommandPhrases[i];
			if(commandText.indexOf(phrase) === 0){
				beingCommanded = true;
			}
		};
		if(!beingCommanded){
			//assume we are not being talked to, maybe listen for phrases
		}else{
			//act on the first command
			var firstCommand = this.scanCommands(commandText,phrase);
			return this.processCommand(firstCommand);
		}
	};

	RalfBot.prototype.scanCommands = function(commandText, commandPhrase){
		//remove the command phrase 
		return commandText.replace(commandPhrase,"");
	};

	RalfBot.prototype.processCommand = function(cmdTxt){
		var command;
		var responseText;
		
		if (~cmdTxt.indexOf("turn off") || ~cmdTxt.indexOf("die") || ~cmdTxt.indexOf("fuck off") || ~cmdTxt.indexOf("go away") || ~cmdTxt.indexOf("sleep")){
			//ask confirmation.
			command = "turnoff";
		}else if(~cmdTxt.indexOf("turn on") || ~cmdTxt.indexOf("come back") || ~cmdTxt.indexOf("where are you") || ~cmdTxt.indexOf("activate")){
			if(this.botState == "sleeping"){
				command = "turnon";
			}
		}else if(~cmdTxt.indexOf("is")){
			if(~cmdTxt.indexOf("time")){
				command = "tellTime";	
			}else if(~cmdTxt.indexOf("name")){
				if(~cmdTxt.indexOf("my")){
					command = "myName";
				}else{
					command = "ralphName";
				}
			}
		}
		
		if(responseText){
			return responseText;
		}	

		return this.brain.performCommand(command);
	};
});

module.exports = RalfBot;