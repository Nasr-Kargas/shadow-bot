var RalfBot = (function() {
    this.shouldTalk = false;
    this.botName = "ralf";
    this.botCommandOne = this.botName + " please";
    this.botCommandTwo = this.botName;
    this.botCommandPhrases = [this.botCommandOne, this.botCommandTwo];
    this.botState = "listening"
	
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

	RalfBot.prototype.processCommand = function(commandText){
		var command;
		var responseText;
		if (~text.indexOf("turn off") || ~text.indexOf("die") || ~text.indexOf("fuck off") || ~text.indexOf("go away") || ~text.indexOf("sleep")){
			//ask confirmation.
			command = "turnoff";
		}else if(~text.indexOf("turn on") || ~text.indexOf("come back") || ~text.indexOf("where are you") || ~text.indexOf("activate")){
			if(this.botState == "sleeping"){
				command = "turnon";
			}else{
				responseText = "I am already on!";
			}
		}else if(~text.indexOf("is")){
			if(~text.indexOf("time")){
				command = "tellTime";	
			}else if(~text.indexOf("name")){
				if(~text.indexOf("my")){
					command = "myName";
				}else{
					command = "ralphName";
				}
			}
		}
		
		if(responseText){
			return responseText;
		}	
		
		return performCommand(command);
	};

	RalfBot.prototype.performCommand = function(command){

	};

});

module.exports = RalfBot;