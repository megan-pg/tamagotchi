// list page

// Choose your pet card 
// * Turtle
// * Fish
// * Gator
// * Mammal

// User inputs Name. Date and pet ID get auto generated.
//  Local storage?

// * Choose level of difficulty 
// * Easy - Starts off with all full meters
// * Medium - Starts off with all half meters
// * Hard - Starts off with meters almost empty


// tamagotchi page
//variable for starting the timer with the start button
const startEl = document.querySelector("#start");

// set seconds to what it starts at
const secondsStart = 0;
//start of function timer function
setTime() => {
  timerInterval = setInterval(function () {
    //addition of seconds from the timer
    secondsStart++;
    //what I want to populate to the page in textContent
    timeEl.textContent = "Time: " + secondsStart;

    //if statement saying if counter is zero stop the timer
    if (secondsStart === 100) {
      clearInterval(timerInterval);
    }
    // counting in milliseconds
  }, 1000);
}

//start timer when start button is clicked function
startEl.onclick = startBtn;
startBtn() => {
  setTime();
}


// html for butons //
<div class="actionBtns col s12">
  <div>
    {/* Feed button - This will update your Hunger meter(makes positive sound) */}
    <audio id="hunger" src="assets/sound-files/positive_sound.mp3"></audio>
    <button class="btn" onclick="document.getElementById('hunger').play()">Feed</button>
  </div>

  <div>
    {/* Medicine button - When your pet's health is very low you can use this but it will also severely lower their Happy/Bored meter (makes a negative sound) */}
    <audio id="medicine" src="assets/sound-files/negative_sound.mp3"></audio>
    <button class="btn" onclick="document.getElementById('medicine').play()">Medicine</button>
  </div>

  <div>
    {/* Clean button - After your pet poops, it will need to be cleaned.Don't let it sit too long in it's poop or the health meter will be decremented. */}
    <audio id="clean" src="assets/sound-files/positive_sound.mp3"></audio>
    <button class="btn" onclick="document.getElementById('clean').play()">Clean</button>
  </div>

  <div>
    {/*  Love your pet to boost Happy / Bored meter(makes a positive sound) */}
    <audio id="love" src="assets/sound-files/positive_sound.mp3"></audio>
    <button class="btn" onclick="document.getElementById('love').play()">Love</button>
  </div>

  <div>
    {/* Play with pet to boost Happy / Bored meter(makes a positive sound) */}
    <audio id="play" src="assets/sound-files/positive_sound.mp3"></audio>
    <button class="btn" onclick="document.getElementById('play').play()">Play</button>
  </div>
</div>


// js for buttons //

$(document).ready(function () {
  $("#hunger").on("click", function (event) {
    event.preventDefault();
    var id = $(this).data("id");
    // console.log(id);
    $.ajax({ url: "X" + id, method: "PUT" })

      .then(function (data) {
        console.log(data);
        location.reload();
      });
  });





// Maybe if we have time:

// * Disipline button - This will decrement your Happy / Bored meter but will also decrement the chance of your pet acting out(make a negative sound)

// * Light button - When your pet becomes bored, it wants to go to sleep.Don't let it sit too long bored or the health meter will be decremented.
