var Bot;
Bot = (function Bot () {
    this.shouldTalk = false
    this.botName = "ralf"
    this.botCommandOne = this.botName + " please"
    this.botCommandTwo = this.botName
    this.processMessage = processMessage

    Bot.prototype.processMessage = function(message, user){
		return message
	}
})

