alert("Lets start the Game");
var buttonColor = ["red","blue","green","yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;
// start game 
$(document).keypress(function(){
    if(!started){
        $("#level-title").text("level "+ level);
        nextSequence();
        started =true;
    }
});

// step 1 
function nextSequence(){
    userClickedPattern = [];
    level++;
    $("#level-titel").text("level "+level);
    var randomNumber = Math.floor(Math.random()*4);
    var randomcolor = buttonColor[randomNumber];
    gamePattern.push(randomcolor);

    $("#"+randomcolor).fadeIn(100).fadeOut(300).fadeIn(100);
    playSound(randomcolor);
}
// step 2 
function animatePress(currentColor){
    $("#"+currentColor).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColor).removeClass("pressed");
    },100);
}

//step 3
function playSound(name){
    //alert("playsound");
    //console.log("Playing sound: " + "sounds/" + name + ".mp3");
    var audio = new Audio("sounds/"+ name + ".mp3");
    audio.play();
}
// step 4
$(".btn").click(function(){
    var userChosenColour = $(this).attr("id");
    //alert("clicked");
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);
    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length-1);
});
// step 5
function checkAnswer(currentLevel){

    if(gamePattern[currentLevel]==userClickedPattern[currentLevel]){
        if(userClickedPattern.length==gamePattern.length){
            setTimeout(function(){
                nextSequence();
            },1000);
        }
    }
    else {
        playSound("wrong");
        $("body").addClass("game-over");
        $("#level-title").text("Game Over,Press Any Key to Restart");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);
        startOver();
    }
}
function startOver(){
    level = 0;
    gamePattern= [];
    started = false;
}
