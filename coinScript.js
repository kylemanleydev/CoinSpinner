var right = true;
var speed = 5000;
score = 0;
var award = 0;
function redeem()
{
	if(score >= 10 && award === 0)
	{
		document.getElementById('spinner').src = 'Media/award.png';
		award = 1;
		score -= 10;
		document.getElementById('score').innerHTML = "x" + score;
		document.getElementById('reward').innerHTML = " Redeem 20 Coins for surprise! ";
		var audio = new Audio('Media/coin.wav');
		audio.play();
	}
	if(score >= 20 && award === 1)
	{
		document.getElementById('spinner').src = 'Media/award2.png';
		award = 2;
		score -= 20;
		document.getElementById('score').innerHTML = "x" + score;
		document.getElementById('reward').innerHTML = " You are now rich! ";
		var audio = new Audio('Media/coin.wav');
		audio.play();
	}
}
function change()
{
  	right = !right;
	if(right === true)
	{
		document.getElementById('spinLeft').id = 'spinRight';
	}
	if(right === false)
	{
		document.getElementById('spinRight').id = 'spinLeft';
	}
}
function spin()
{
	$('#spinRight').css("animation-duration", speed + 'ms');
	$('#spinLeft').css("animation-duration", speed + 'ms');
	speed -= 250;
	console.log(speed);
	if (speed <= 200) 
	{
	    speed = 200;
	}
	score += 1;
	document.getElementById('score').innerHTML = "x" + score;
}
function reset()
{
	$('#spinRight').css("animation-duration", 0 + 'ms');
	$('#spinLeft').css("animation-duration", 0 + 'ms');
	document.getElementById('score').innerHTML = "x0";
	score = 0;
	speed = 5000;
}
