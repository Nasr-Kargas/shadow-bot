var RalfBot = (function() {
    this.shouldTalk = false;
    this.botName = "ralf";
    this.botCommandOne = this.botName + " please";
    this.botCommandTwo = this.botName;
	
	RalfBot.prototype.processMessage = function(message, user){
		console.dir(message);
		return message.text;
	};
});

module.exports = RalfBot;