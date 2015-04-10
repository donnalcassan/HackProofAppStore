// variables used to refer to page elements
var pointDie1Img; // refers to first die point img
var pointDie2Img; // refers to second die point img
var rollDie1Img; // refers to first die roll img
var rollDie2Img; // refers to second die roll img
var messages; // refers to "messages" paragraph
var playButton; // refers to Play button
var rollButton; // refers to Roll button
var dicerolling; // refers to audio clip for dice

// other variables used in program
var myPoint; // point if no win/loss on first roll
var die1Value; // value of first die in current roll
var die2Value; // value of second die in current roll
//counts how many time the play button has been clicked
function count()
{
	var counter = 0;
	counter++;
	messages.innerHTML = "You can try twice a day. This is game " + counter + ".";
}
// starts a new game
function startGame() 
{
	// get the page elements that we'll interact with
	dicerolling = document.getElementById( "dicerolling" );
	pointDie1Img = document.getElementById( "pointDie1" );
	pointDie2Img = document.getElementById( "pointDie2" );
	rollDie1Img = document.getElementById( "rollDie1" );
	rollDie2Img = document.getElementById( "rollDie2" );
	messages = document.getElementById( "messages" );
	playButton = document.getElementById( "play" );
	rollButton = document.getElementById( "roll" );

	// prepare the GUI
	rollButton.disabled = true; // disable rollButton
	setImage( pointDie1Img ); // reset image for new game
	setImage( pointDie2Img ); // reset image for new game
	setImage( rollDie1Img ); // reset image for new game
	setImage( rollDie2Img ); // reset image for new game

	myPoint = 0; // there is currently no point 
	firstRoll(); // roll the dice to start the game
} // end function startGame

// perform first roll of the game
function firstRoll()
{
	var sumOfDice = rollDice(); // first roll of the dice

	// determine if the user won, lost or must continue rolling
	switch (sumOfDice) 
	{
	   case 7: case 11: // win on first roll
		  messages.innerHTML = "You Win!!! Click Play to play again.";
		  break;
	   case 2: case 3: case 12: // lose on first roll
		  messages.innerHTML = "Sorry. You Lose. Click Play to play again.";
		  break;
	   default: // remember point
		  myPoint = sumOfDice;
		  setImage( pointDie1Img, die1Value );
		  setImage( pointDie2Img, die2Value );
		  messages.innerHTML = "Roll Again!";
		  rollButton.disabled = false; // enable rollButton
		  playButton.disabled = true; // disable playButton
		  break;
	} // end switch
} // end function firstRoll

// called for subsequent rolls of the dice
function rollAgain()
{
	var sumOfDice = rollDice(); // subsequent roll of the dice

	if (sumOfDice == myPoint) 
	{
	   messages.innerHTML = "You Win!!! Click Play to play again.";
	   rollButton.disabled = true; // disable rollButton
	   playButton.disabled = false; // enable playButton
	} // end if
	else if (sumOfDice == 7) // craps
	{
	   messages.innerHTML = "Sorry. You Lose. Click Play to play again.";
	   rollButton.disabled = true; // disable rollButton
	   playButton.disabled = false; // enable playButton
	} // end else if
} // end function rollAgain

// roll the dice
function rollDice() 
{
	dicerolling.play(); // play dice rolling sound

	// clear old die images while rolling sound plays
	die1Value = NaN;
	die2Value = NaN;
	showDice();

	die1Value = Math.floor(1 + Math.random() * 6);
	die2Value = Math.floor(1 + Math.random() * 6);
	return die1Value + die2Value;
} // end function rollDice

// display rolled dice
function showDice()
{
	setImage( rollDie1Img, die1Value );
	setImage( rollDie2Img, die2Value );
} // end function showDice

// set image source for a die
function setImage( dieImg, dieValue ) 
{
	if (isFinite(dieValue))
	   dieImg.src = "die" + dieValue + ".png";
	else
	   dieImg.src = "blank.png";
} // end function setImage

// register event listeners
function start()
{
	var playButton = document.getElementById( "play" );
	playButton.addEventListener( "click", startGame, false );
	var rollButton = document.getElementById( "roll" );
	rollButton.addEventListener( "click", rollAgain, false );
	var diceSound = document.getElementById( "dicerolling" );
	diceSound.addEventListener( "ended", showDice, false );
} // end function start
window.addEventListener( "load", start, false );
 
 function processlinks()
{
	var linkslist = document.links; // get the document's links
	var contents = "Page Links:  ";
	// concatenate each link to contents
	for ( var i =  0; i < linkslist.length; ++i )
	{	
		var currentLink = linkslist[ i ];
		contents +=  "<a href='" + currentLink.href + "'>" + currentLink.innerHTML  + " - ";
	} // end for

	document.getElementById( "links" ).innerHTML = contents;
} // end function processlinks		
	window.addEventListener( "load", processlinks, false );  

function todaysdate()
{
    var todays_date = new Date();
    var myyear = todays_date.getFullYear();
    var mymonth=todays_date.getMonth()+ 1;
    var mytoday=todays_date.getDate();
    messages.innerHTML = messages + " " +(mymonth + "/" + mytoday + "/" + myyear);
}
