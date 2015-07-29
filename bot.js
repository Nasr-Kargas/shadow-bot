var RalfBot = (function() {
    this.shouldTalk = false;
    this.botName = "ralf";
    this.botCommandOne = this.botName + " please";
    this.botCommandTwo = this.botName;
    this.botCommandPhrases = [this.botCommandOne, this.botCommandTwo];
	
	RalfBot.prototype.processMessage = function(message, user){
		console.dir(message);
		commandText = message.text.toLowerCase().trim();
		var beingCommanded = false;
		for (var i = this.botCommandPhrases.length - 1; i >= 0; i--) {
			var phrase = this.botCommandPhrases[i];
			if(commandText.startsWith(phrase)){
				beingCommanded = true;
			}
		};
		if(!beingCommanded){
			//assume we are not being talked to, maybe listen for phrases
		}else{
			//act on the first command
			var firstCommand = this.scanCommands(commandText);
			return this.processCommand(firstCommand);
		}
	};

	RalfBot.prototype.scanCommands = function(commandText, commandPhrase){
		//remove the command phrase 
		return commandText.replace(commandPhrase,"");
	};

	RalfBot.prototype.processCommand = function(commandText){
		return commandText;
	};

});

module.exports = RalfBot;