// References:
// https://stackoverflow.com/a/47585920

var lasttime = 0,  lastduration = 0,  angle = 0;


var right = true;
var speed = .4;
var score = 0;
var awardLevel = 0; // Arrays start at 0

// Set all elements as variables for faster references and full jquery support
var spinnerElement = $('#spinner');
var scoreElement = $('#score');
var rewardElement = $('#reward');

var gravity;

// Store all rewards as JSON objects into an Array
var rewards = new Array(
		{ name: "Level 0", spinner: "Media/fidget.png", message: "Redeem 10 Coins for Next Level", cost: 0, class: "default", mass: .2 },
		{ name: "Level 1", spinner: "Media/award.png", message: "Redeem 20 Coins for Next Level", cost: 10, class: "award1", mass: .15  },
		{ name: "Level 2", spinner: "Media/award2.png", message: "Redeem 40 Coins for Next Level", cost: 20, class: "award2", mass: .1  },
		// spinner source: https://commons.wikimedia.org/wiki/File:Vector_Loading.svg 
		{ name: "Level 3", spinner: "Media/award3.png", message: "You are now rich!", cost: 40, class: "award3", mass: .05  }
	);

// Advance to higher reward level
function redeem()
{
	// console.log( rewards[awardLevel + 1].cost );
	// console.log( awardLevel );
	// console.log( rewards.length );

	if( ( ( awardLevel+1 ) < rewards.length ) && rewards[awardLevel + 1].cost <= score ) {
		// increase awardLevel
		awardLevel += 1;		

		// remove Cost of Reward
		score -= rewards[awardLevel].cost;
		updateScore();

		// set new image
		spinnerElement.attr( 'src', rewards[awardLevel].spinner );
		
		// set Display Message		
		rewardElement.html( rewards[awardLevel].message );
		
		// Play Audio Clip
		var audio = new Audio('Media/coin.wav');
		audio.play();

		// add class to spinner
		spinnerElement.addClass( rewards[awardLevel].class );
		
	}else{
		// console.log("Not enough Coins to Advance");
	}
	
}

// Change direction of rotation
function change()
{
	// reverse direction by changing Boolean Value
  	right = !right;
	if (right === true) {
		spinnerElement.removeClass('left');
		spinnerElement.addClass('right');
	} else 	if (right === false) {
		spinnerElement.removeClass('right');
		spinnerElement.addClass('left');
	}
}

// onClick function for spinner
function spin()
{
	// spinnerElement.css("animation-duration", Math.exp(-speed)*20000 + 'ms');
	// console.log(Math.exp(-speed)*10000);
	speed += .1;
	// console.log(speed);
	score += 1;
	updateScore();
	
	adjustSpeed();

}

// Resets all variables and screen elements to default values
function reset()
{
	// Reset Spinner
	// spinnerElement.css("animation-duration", 0 + 'ms');
	spinnerElement.removeClass('rotate');
	spinnerElement.removeClass('award1');
	spinnerElement.removeClass('award2');
	spinnerElement.removeClass('award3');
	spinnerElement.addClass('default');
	spinnerElement.attr('src', 'Media/fidget.png');

	// stop spinner
	spinnerElement.removeClass('rotate');
	// Reset Speed
	speed = .4;
	rewardElement.html(" Redeem 10 Coins for surprise! ");
	// Reset Score
	score = 0;
	updateScore();
	// Reset Awards
	awardLevel = 0;
}

// Update score display in html element
function updateScore(){
	// Reuse update code, if html changes, only have to change JS in 1 place
	scoreElement.html( "x" + score );
}

// Adjust speed
function adjustSpeed(){
	// var speed = $(this).val();
	// $('#speed').html(speed);

	// var el = $("#loading");
	// var duration = (speed > 0) ? 50 / speed : 0;
	var duration = Math.exp(-speed)*10000;
	// var currenttime = event.originalEvent.timeStamp / 1000;
	var date = new Date();
	var timestamp = date.getTime();
	currenttime = timestamp;

	var difftime = currenttime - lasttime;
	spinnerElement.removeClass("rotate").show();

	if (!lastduration && duration) {
		spinnerElement.css("transform", "");
	} else {
	  	angle += (difftime % lastduration) / lastduration;
	}
	
	// console.log(currenttime);
	// console.log(difftime);
	// console.log(duration);
	// console.log(lastduration);
	// console.log( angle );

	if (duration){     
		spinnerElement.css("animation-duration", duration + "ms")
		.css("animation-delay", -duration * angle + "ms")    
		.addClass("rotate");
		// console.log( spinnerElement.css("animation-delay") );
	} else {
		spinnerElement.css("transform", "rotate(" + 360 * angle + "deg)");	
	}	

	angle -= angle | 0; //use fractional part only
	lasttime = currenttime;
	lastduration = duration;
}

// clicking on BTC image sets score to 100
function cheat(){
	score = 100;
}

// gravity
function gravity(){
	if( spinnerElement.hasClass('rotate') ){
		// console.log(speed); 
		speed -= rewards[awardLevel].mass;
		if( speed <= 0 ){
			// stop spinner
			// spinnerElement.css("animation-duration", 0 + 'ms');
			spinnerElement.removeClass("rotate");
			// reset minimum speed
			speed = .4;
			// clear gravity
			// clearInterval(gravity);
			return;
		}
		adjustSpeed();
		// spinnerElement.css("animation-duration", Math.exp(-speed)*20000 + 'ms');

		// console.log(speed);
	}else {
		// console.log('not spinning');
	}
	
}

// Run reset at start to ensure proper defaults
reset();

setInterval(gravity, 1000);