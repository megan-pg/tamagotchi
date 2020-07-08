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
