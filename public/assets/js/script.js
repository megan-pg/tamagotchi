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

//start timer when start button is clicked function
startEl.onclick = startBtn;
function startBtn() {
  //when start button is clicked, hide the intro information located in startCard id on home page
  startCardEl.classList.add("hide");
  //when start button is clicked, show the new questionCard id on home page
  questionCardEl.classList.remove("hide");
  setTime();
  getQuestion();
}


* Hunger button
  * Feed - This will update your Hunger meter(makes positive sound)
    * Snack - This will update your Happy / Bored and Hunger meters but will decrement your Health meter.

* Disipline button - This will decrement your Happy / Bored meter but will also decrement the chance of your pet acting out(make a negative sound)

  * Medicine button - When your pet's health is very low you can use this but it will also severely lower their Happy/Bored meter (makes a negative sound)

    * Clean button - After your pet poops, it will need to be cleaned.Don't let it sit too long in it's poop or the health meter will be decremented.

* Happy / Bored Button
  * Love your pet to boost Happy / Bored meter(makes a positive sound)
    * Play with pet to boost Happy / Bored meter(makes a positive sound)

      * Light button - When your pet becomes bored, it wants to go to sleep.Don't let it sit too long bored or the health meter will be decremented. 
