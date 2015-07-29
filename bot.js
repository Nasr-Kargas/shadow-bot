function Bot () {
    this.shouldTalk = false;
    this.botName = "ralf"
    this.botCommandOne = this.botName + "please"
    this.botCommandTwo = this.botName;
    this.processMessage = processMessage;
}

processMessage = function(message, user){
	return message;
}