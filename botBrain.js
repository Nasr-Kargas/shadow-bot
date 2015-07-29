var BotBrain = (function(botName, slackSelf) {
	var $ = require('jquery');
	this.botState = "listening";
	this.botName = botName;
	this.slackSelf = slackSelf;
	this.botTalkingTo;

	var wikipediaHTMLResult = function(data) {
	    var readData = $('<div>' + data.parse.text.* + '</div>');
	    // handle redirects
	    var redirect = readData.find('li:contains("REDIRECT") a').text();
	    if(redirect != '') {
	    	callWikipediaAPI(redirect);
	        return;
	    }
	    
	    var box = readData.find('.infobox');
	    
	    var binomialName    = box.find('.binomial').text();
	    var fishName        = box.find('th').first().text();
	    var imageURL        = null;
	    // Check if page has images
	    if(data.parse.images.length >= 1) {
	        imageURL        = box.find('img').first().attr('src');
	    }
	    
	    $('#insertTest').append('<div><img src="'+ imageURL + '"/>'+ fishName +' <i>('+ binomialName +')</i></div>');
	};

	function callWikipediaAPI(wikipediaPage) {
		// http://www.mediawiki.org/wiki/API:Parsing_wikitext#parse
	    $.getJSON('http://en.wikipedia.org/w/api.php?action=parse&format=json&callback=?', {page:wikipediaPage, prop:'text|images', uselang:'en'}, wikipediaHTMLResult);
	}
  
	this.tellTime = function(){
		var time = new Date();
		console.log(time.getHours() + ":" + time.getMinutes() + ":" + time.getSeconds());
		return "The time is " + time.getHours() + ":" + time.getMinutes() + ":" + time.getSeconds();
	}

	this.tellName = function(){
		return "My name is " + slackSelf.name +" but you can call me " + botName;
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
		}else if(command == "wikiLookup"){
			callWikipediaAPI('Thunder Cats');
		}else{
			return command;
		}
	};
});

module.exports = BotBrain;