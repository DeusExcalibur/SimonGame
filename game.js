let buttonColours = ["red","blue","green","yellow"];

let gamePattern = [];
let userClickedPattern = [];

let level = 0;

let bien = true;
let continuar = true;

//Create Sequence
function nextSequence() {

  userClickedPattern = [];

  level++;

  $("h1").text("Level " + level);

  let randomNumber = Math.floor(Math.random() * 4);

  let randomChosenColour = buttonColours[randomNumber];

  gamePattern.push(randomChosenColour);

  playSound(randomChosenColour);
  animatePress(randomChosenColour);
}

//Get Clicks
$(".btn").on("click", function (e) {
  userChosedColor = e.target.getAttribute("id");

  userClickedPattern.push(userChosedColor);

  playSound(userChosedColor);
  animatePress(userChosedColor);

  checkAnswer();
});

//Start Game
$(document).on("keypress", function(e){

  if(e.key == "a" && gamePattern.length == 0){
    nextSequence();
  }else{

  }
});

//Check Answer
function checkAnswer() {

  if (gamePattern.length === userClickedPattern.length) {
    for (i=0; i < gamePattern.length && continuar == true; i++) {
      if(gamePattern[i] == userClickedPattern[i]){
        bien = true;
      }else{
        bien = false;
        continuar = false;
      }
    }
    if(bien == true){
      setTimeout(() => {
        nextSequence();
      }, 1000);
    }
    if(bien == false){
      playSound("wrong");
      $("body").addClass("game-over");
      setTimeout(()=> {
        $("body").removeClass("game-over");
      }, 100);
      $("h1").text("Game Over, Press A to Restart");
      startOver();
    }
  }
}

//Start Over
function startOver() {
  level = 0;
  bien = true;
  continuar = true;
  gamePattern = [];
}

//Play Sound
function playSound(color) {
  let audio = new Audio("./sounds/"+color+".mp3");
  audio.play();
}

//Animation
function animatePress(currentColor) {
  $("#"+currentColor).addClass("pressed");
  setTimeout(()=> {
    $("#"+currentColor).removeClass("pressed");
  }, 100);
}