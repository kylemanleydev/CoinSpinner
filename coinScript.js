var right = true;
var speed = .4;
var score = 0;
var award = 0;

var spinner = $('#spinner');

function redeem()
{
	if(score >= 10 && award === 0)
	{
		spinner.attr('src', 'Media/award.png');
		award = 1;
		score -= 10;
		document.getElementById('score').innerHTML = "x" + score;
		document.getElementById('reward').innerHTML = " Redeem 20 Coins for surprise! ";
		var audio = new Audio('Media/coin.wav');
		audio.play();
		spinner.addClass('award1');
	}
	if(score >= 20 && award === 1)
	{
		spinner.attr('src', 'Media/award2.png');
		award = 2;
		score -= 20;
		document.getElementById('score').innerHTML = "x" + score;
		document.getElementById('reward').innerHTML = " You are now rich! ";
		var audio = new Audio('Media/coin.wav');
		audio.play();
		spinner.addClass('award2');
	}
}
function change()
{
	// reverse direction by changing Boolean Value
  	right = !right;
	if(right === true)
	{
		spinner.removeClass('left');
		spinner.addClass('right');
	}
	if(right === false)
	{
		spinner.removeClass('right');
		spinner.addClass('left');
	}
}
function spin()
{
	spinner.css("animation-duration", Math.exp(-speed)*20000 + 'ms');
	// console.log(Math.exp(-speed)*10000);
	speed += .1;
	// console.log(speed);
	score += 1;
	document.getElementById('score').innerHTML = "x" + score;
}
function reset()
{
	spinner.css("animation-duration", 0 + 'ms');
	spinner.removeClass('award1');
	spinner.removeClass('award2');
	spinner.addClass('default');
	spinner.attr('src', 'Media/fidget.png');
	document.getElementById('score').innerHTML = "x0";
	score = 0;
	speed = .4;
}
