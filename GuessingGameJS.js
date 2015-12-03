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

var guessArr = []

function playersGuessSubmission(){
// Add functionality to the playersGuessSubmission function to grab data (the Player's guess) from the input field when the Submit Guess button is clicked and assign the data to the playersGuess variable.
  playersGuess = +$("#UserInput").val();

 //push the guesses to the array

  guessArr.push(playersGuess);

  checkGuess();
// Remove the data (Player's guess) from the input field from the DOM since it is already stored in our Web Browser's memory.
// Write User Guess in h4
  $("#UserInput").val("");


//  ??? how to make enter key to work on submit button?
// $('#Submit').keydown(function() {
// var key = e.which;
// if (key == 13) {
// // As ASCII code for ENTER key is "13"
// $('#Submit').submit(); // Submit form code
// }
// });


}
// 1: Create a click event on the Submit Guess Button.


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
  //var $result = $m1 + $m2;
  $("#Message").text($m1 + $m2);
  //return $message;
}

// Check if the Player's Guess is the winning number 

function preventDefault(x) {

  x.click(function( event ) {
  event.preventDefault();
  $( "<div>" )
    .append( 'Click "Play Again" to try one more time' )
    .appendTo( $("#Message").empty() );
    $("#NumberMessage").empty();
    $("#RemainingGuesses").empty();
});


}


//??? DOESN"T WORK. Where is a bug?
function checkForRepeatedEntries(arr) {
  arr.sort();
  var noRepeats = true;
  for(var i = 1; i < arr.length; i++) {
    if(arr[i] == arr[i-1]) {
        noRepeats === false;
    }

  }
  return noRepeats;
}

function checkGuess(){

  if(playersGuess === winningNumber) {
     $("#NumberMessage").text("Your number is " + playersGuess);
     $("#Message").text("YOU WON!!!");
     $("#RemainingGuesses").text('Click "Play Again" to try one more time');

     $("body").css("background-image", "url('http://cliparts.co/cliparts/pi7/8gq/pi78gqb7T.jpg')");
     $("h1").css("display", "none");
     $("h2").css("display", "none");
     $("#YouWon").css("display", "none");
     $(".paddingTop230").css("padding-top", "350px");
     $("#Message").css("font-size", "70px");

     preventDefault($("#Submit"));
     preventDefault($("#Hint"));

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

      //check for the repeated User Inputs
      //??? DOESN"T WORK. Where is a bug?

      else if(!checkForRepeatedEntries(guessArr)) {
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
     preventDefault($("#Hint"));
  }
  // add code here
}

// Create a provide hint button that provides additional clues to the "Player"

function provideHint(){

  var $h0 = "Your number is one of the three numbers: "; 
  var $h1 = generateWinningNumber();
  var $h2 = generateWinningNumber();
  var $h3 = winningNumber;
  
  // var array = [$h1,$h2,$h3]
  // var randomizedArray = [];


  
  // randomizedArray[0] = arrRandom();
  
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