/* **** Guessing Game Functions **** */
function guessingGame() {
// Assign generateWinningNumber() return value to the winningNumber variable
var playersGuess;
var winningNumber = generateWinningNumber();

// Generate the Winning Number
function generateWinningNumber(){
  return Math.floor((Math.random() * 100) + 1);
}

// Fetch the Players Guess
var $numGuesses = 10;
function playersGuessSubmission(){
// Add functionality to the playersGuessSubmission function to grab data (the Player's guess) from the input field when the Submit Guess button is clicked and assign the data to the playersGuess variable.
 playersGuess = +$("#UserInput").val();
 checkGuess();
// Remove the data (Player's guess) from the input field from the DOM since it is already stored in our Web Browser's memory.
// Write User Guess in h4
  $("h4").text("Your guess is " + playersGuess);
  $("#UserInput").val("");

}
// 1: Create a click event on the Submit Guess Button.

  //$("#Submit").click(checkGuess);

// Determine if the next guess should be a lower or higher number
//var $m2 = lowerOrHigher();
function lowerOrHigher(){
    var $mes;
     if(playersGuess < winningNumber) {
       $mes = "Try higher!";
    }//if
    //alert("try again!")
    else if(playersGuess > winningNumber) {
       $mes = "Try lower!";
    }
  return $mes;
}

function guessMessage() {
  var $m2 = lowerOrHigher();
  if (Math.abs(winningNumber - playersGuess) > 30) {
    $m1 = "Your guess is more than 30 digits from the winning number. ";
  }
  else if(Math.abs(winningNumber - playersGuess) > 20) {
    $m1 = "Your guess is more than 20 digits away from the winning number. ";
  }
  
  else if(Math.abs(winningNumber - playersGuess) > 10) {
    $m1 = "Your guess is more than 10 digits away from the winning number. ";
  }
  
  else if(Math.abs(winningNumber - playersGuess) < 5) {
    $m1 = "Your guess is within 5 digits from the winning number. ";
  }
  //var $result = $m1 + $m2;
  $("#Message").text($m1 + $m2);
  //return $message;
}

// Check if the Player's Guess is the winning number 

function checkGuess(){
   if(playersGuess === winningNumber) {
     $("#Message").empty();
     $("#RemainingGuesses").text("YOU WON!!!");
   }
  else {
      $numGuesses--;
      $("#RemainingGuesses").text($numGuesses + " attempts left!");
    guessMessage();
  }
  // add code here
}

// Create a provide hint button that provides additional clues to the "Player"

function provideHint(){
  var $h0 = "Your number is one of the three numbers: "; 
  var $h1 = generateWinningNumber();
  var $h2 = generateWinningNumber();
  var $h3 = winningNumber;
  
  var array = [$h1,$h2,$h3]
  var randomizedArray = [];
  
  randomizedArray[0] = arrRandom();
  
  if($h1 === $h2 || $h1 === $h3 || $h2 === $h2) {
    $h1 === generateWinningNumber();
    $h2 = generateWinningNumber();
  }
  
  $("#Message").text($h0 + "  "+ $h1 + "  " + $h2 + "  " + $h3);
  // add code here
}

// Allow the "Player" to Play Again

function playAgain(){
  location.reload(true);
  // add code here
  
}


$("#Submit").click(playersGuessSubmission);
$("#Hint").click(provideHint);
$("#PlayAgain").click(playAgain);

}

$(document).ready(guessingGame);

/* **** Event Listeners/Handlers ****  */ 