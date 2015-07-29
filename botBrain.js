var BotBrain = (function() {
	this.botState = "listening";

	BotBrain.prototype.performCommand = function(command){
		return command;
	};
});

module.exports = BotBrain;