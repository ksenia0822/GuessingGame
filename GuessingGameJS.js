/* **** Guessing Game Functions **** */
function guessingGame() {
// Assign generateWinningNumber() return value to the winningNumber variable
var playersGuess;
var winningNumber = generateWinningNumber(100);

// Generate the Winning Number
function generateWinningNumber(num){
  return Math.floor((Math.random() * num) + 1);
}

// Fetch the Players Guess
var $numGuesses = 7;

var guessArr = [];

function playersGuessSubmission(){
// Add functionality to the playersGuessSubmission function to grab data (the Player's guess) from the input field when the Submit Guess button is clicked and assign the data to the playersGuess variable.
playersGuess = +$("#UserInput").val();
checkGuess();
guessArr.push(playersGuess);
// Remove the data (Player's guess) from the input field from the DOM since it is already stored in our Web Browser's memory.
// Write User Guess in h4
$("#UserInput").val("");
}

// Determine if the next guess should be a lower or higher number
//var $m2 = lowerOrHigher();
function lowerOrHigher(){
  var $mes;
  if(playersGuess < winningNumber) {
    $mes = "Try higher!";
  }
  else if(playersGuess > winningNumber) {
    $mes = "Try lower!";
  }
  return $mes;
}

function guessMessage() {
  var $m2 = lowerOrHigher();
  if (Math.abs(winningNumber - playersGuess) > 20) {
    $m1 = "Your guess is more than 20 digits from the winning number. ";
  }
  else if(Math.abs(winningNumber - playersGuess) > 10) {
    $m1 = "Your guess is more than 10 digits away from the winning number. ";
  }
  
  else if(Math.abs(winningNumber - playersGuess) > 5) {
    $m1 = "Your guess is more than 5 digits away from the winning number. ";
  }
  
  else if(Math.abs(winningNumber - playersGuess) < 5) {
    $m1 = "Your guess is within 5 digits from the winning number. ";
  }
  $("#Message").text($m1 + $m2);
}

// Check if the Player's Guess is the winning number 
function preventDefault(x) {
  x.click(function( event ) {
    event.preventDefault();
    $( "<div>" )
    .append( 'Click "Play Again" to try one more time' )
    .appendTo( $("#NumberMessage").empty() );
    $("#Message").empty();
    $("#RemainingGuesses").empty();
  });
}

//??? DOESN"T WORK. Where is a bug?



function checkForRepeats(arr,currentGuess) {
  var repeats;
  var repeats = true;

  if(arr.indexOf(currentGuess) === -1) {
      //guessArr.push(currentGuess);
      repeats = false;
    }
    return repeats;
  }

  function checkGuess(){

    if(playersGuess === winningNumber) {
     preventDefault($("#Submit"));
     preventDefault($("#Hint"));
     $("#NumberMessage").text("Your number is " + playersGuess);
     $("#Message").text("YOU WON!!!");
     $("body").css("background-image", "url('http://cliparts.co/cliparts/pi7/8gq/pi78gqb7T.jpg')");
     $("h1, h2, #InputField, #RemainingGuesses, #Hint").hide();
     $(".paddingTop230").css("padding-top", "390px");
     $("#Message").css("font-size", "70px");

   }

   else {
    if(isNaN(playersGuess) || playersGuess === 0) {
      $("#NumberMessage").text("This is not a number");
      $("#Message").text("You should enter a valid number!");
    } 

    else if(playersGuess < 0 || playersGuess > 100) {
      $("#NumberMessage").text("Your number is " + playersGuess);
      $("#Message").text("This number is not in the range from 1 to 100. Try another one!");

    }

    else if(checkForRepeats(guessArr, playersGuess) === true) {
      $("#NumberMessage").text("Your number is " + playersGuess);
      $("#Message").text("You have already tried this number. Try another one!");
    }

    else {
      $numGuesses--;
      $("#NumberMessage").text("Your number is " + playersGuess);
      $("#RemainingGuesses").text($numGuesses + " attempts left!");
      guessMessage();
    }
  }

  if($numGuesses < 1) {
   $("#Message").text("You ran out of attempts. LOOSER!")
   $("#RemainingGuesses").text('Click "Play Again" to try one more time');
   preventDefault($("#Submit"));
   $("#Hint, #InputField").hide();
 }
}

// Create a provide hint button that provides additional clues to the "Player"
function provideHint(){
  var $h0 = "Your number is one of the three numbers: "; 
  var $h1 = generateWinningNumber(100);
  var $h2 = generateWinningNumber(100);
  var $h3 = winningNumber;
  
  if($h1 === $h2 || $h1 === $h3 || $h2 === $h2) {
    $h1 = generateWinningNumber(100);
    $h2 = generateWinningNumber(100);
  }
  
  var randArr = [$h1, $h2, $h3];
  shuffle(randArr);

  $("#Message").text($h0 + "  "+ randArr[0] + "  " + randArr[1] + "  " + randArr[2]);
}



//shuffle hint array
function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex ;

  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

// Allow the "Player" to Play Again
function playAgain(){
  location.reload(true);
}

/* **** Event Listeners/Handlers ****  */ 
$("#Submit").click(playersGuessSubmission);
$("#Hint").click(provideHint);
$("#PlayAgain").click(playAgain);

$(document).keypress(function(e) {
  if(e.which == 13) {
    playersGuessSubmission();
  }
  $("Message").empty();
});

//disable hint after it was clicked once
$().ready(function() {
  $("#Hint").click(function () {
    $(this).hide();
    return true;
  });
});

}

$(document).ready(guessingGame);

