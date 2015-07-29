var RalfBot;
RalfBot = (function RalfBot () {
    this.shouldTalk = false;
    this.botName = "ralf";
    this.botCommandOne = this.botName + " please";
    this.botCommandTwo = this.botName;
    this.processMessage = processMessage;

    RalfBot.prototype.processMessage = function(message, user){
		return message;
	};
});

