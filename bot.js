var RalfBot = (function() {
    this.shouldTalk = false;
    this.botName = "ralf";
    this.botCommandOne = this.botName + " please";
    this.botCommandTwo = this.botName;
    this.processMessage = processMessage;
	
	this.processMessage = function(message, user){
		return message;
	};
});

