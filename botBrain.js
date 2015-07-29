var BotBrain = (function(botName) {
	this.botState = "listening";
	this.botName = botName;
	this.botTalkingTo;

	this.tellTime = function(){
		var time = new Date();
		console.log(time.getHours() + ":" + time.getMinutes() + ":" + time.getSeconds());
		return "The time is " + time.getHours() + ":" + time.getMinutes() + ":" + time.getSeconds();
	}

	this.tellName = function(){
		return "My name is " + botName;
	}

	this.tellYourName = function(){
		if(this.botTalkingTo != null){
			return "Your name is " + this.botTalkingTo;
		}else{
			return "sorry I can remember your name.";
		}
	}

	this.turnOn = function(){
		if(this.botState == "listening"){
			return "I'm already awake";
		}else{
			this.botState = "listening"
			return "You summond me";
		}
	}

	this.turnOff = function(){
		this.botState = "sleeping"
		return "going to sleep..."
	}

	BotBrain.prototype.performCommand = function(command){
		if(command == "turnOn"){
			return this.turnOn();
		}

		if(this.botState == "sleeping") return;

		if(command == "tellTime"){
			return this.tellTime();
		}else if(command == "myName"){
			return this.tellYourName();
		}else if(command == "ralphName"){
			return this.tellName();
		}else if(command == "turnOff"){
			return this.turnOff
		}else{
			return command;
		}
	};
});

module.exports = BotBrain;