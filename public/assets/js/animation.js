// Basic animation code, to be inserted into the html
// <div id='demo'>
//  <p id='image' onmouseover='animateScript()' onmouseout='stopAnimate()'>
//  </p>
// </div>

let tID; // we will use this variable to clear the setInterval()
const stopAnimate = () => {
  clearInterval(tID);
}; // end of stopAnimate()

const eggHatching = () => {
  let position = 0; // start position for the image slicer
  const interval = 500; // 500 ms of interval for the setInterval()
  const diff = 640; // diff as a variable for position offset
  tID = setInterval(() => {
    document.getElementById('eggHatch').style.backgroundPosition = `-${position}px 0px`;
    // Template literal to insert the variable 'position'
    if (position < 4480) {
      position += diff;
    } else { // we increment the position by 640 each time
      position = 0;
    }
    // reset the position to 0px, once position exceeds 4480px
  }, interval); // end of setInterval
}; // end of eggHatching()

const birdBathroom = () => {
  let position = 0; // start position for the image slicer
  const interval = 500; // 500 ms of interval for the setInterval()
  const diff = 640; // diff as a variable for position offset
  tID = setInterval(() => {
    document.getElementById('birdBathroom').style.backgroundPosition = `-${position}px 0px`;
    // Template literal to insert the variable 'position'
    if (position < 1280) {
      position += diff;
    } else { // we increment the position by 640 each time
      position = 0;
    }
    // reset the position to 0px, once position exceeds 4480px
  }, interval); // end of setInterval
}; // end of animateAnimalState()

const birdBored = () => {
  let position = 0; // start position for the image slicer
  const interval = 500; // 500 ms of interval for the setInterval()
  const diff = 640; // diff as a variable for position offset
  tID = setInterval(() => {
    document.getElementById('birdBored').style.backgroundPosition = `-${position}px 0px`;
    // Template literal to insert the variable 'position'
    if (position < 1280) {
      position += diff;
    } else { // we increment the position by 640 each time
      position = 0;
    }
    // reset the position to 0px, once position exceeds 4480px
  }, interval); // end of setInterval
}; // end of animateAnimalState()

const birdDefault = () => {
  let position = 0; // start position for the image slicer
  const interval = 500; // 500 ms of interval for the setInterval()
  const diff = 640; // diff as a variable for position offset
  tID = setInterval(() => {
    document.getElementById('birdDefault').style.backgroundPosition = `-${position}px 0px`;
    // Template literal to insert the variable 'position'
    if (position < 1280) {
      position += diff;
    } else { // we increment the position by 640 each time
      position = 0;
    }
    // reset the position to 0px, once position exceeds 4480px
  }, interval); // end of setInterval
}; // end of animateAnimalState()

const birdExercise = () => {
  let position = 0; // start position for the image slicer
  const interval = 500; // 500 ms of interval for the setInterval()
  const diff = 640; // diff as a variable for position offset
  tID = setInterval(() => {
    document.getElementById('birdExercise').style.backgroundPosition = `-${position}px 0px`;
    // Template literal to insert the variable 'position'
    if (position < 1280) {
      position += diff;
    } else { // we increment the position by 640 each time
      position = 0;
    }
    // reset the position to 0px, once position exceeds 4480px
  }, interval); // end of setInterval
}; // end of animateAnimalState()

const birdFatigue = () => {
  let position = 0; // start position for the image slicer
  const interval = 500; // 500 ms of interval for the setInterval()
  const diff = 640; // diff as a variable for position offset
  tID = setInterval(() => {
    document.getElementById('birdFatigue').style.backgroundPosition = `-${position}px 0px`;
    // Template literal to insert the variable 'position'
    if (position < 1280) {
      position += diff;
    } else { // we increment the position by 640 each time
      position = 0;
    }
    // reset the position to 0px, once position exceeds 4480px
  }, interval); // end of setInterval
}; // end of animateAnimalState()

const birdHungry = () => {
  let position = 0; // start position for the image slicer
  const interval = 500; // 500 ms of interval for the setInterval()
  const diff = 640; // diff as a variable for position offset
  tID = setInterval(() => {
    document.getElementById('birdHungry').style.backgroundPosition = `-${position}px 0px`;
    // Template literal to insert the variable 'position'
    if (position < 1280) {
      position += diff;
    } else { // we increment the position by 640 each time
      position = 0;
    }
    // reset the position to 0px, once position exceeds 4480px
  }, interval); // end of setInterval
}; // end of animateAnimalState()

const birdLove = () => {
  let position = 0; // start position for the image slicer
  const interval = 500; // 500 ms of interval for the setInterval()
  const diff = 640; // diff as a variable for position offset
  tID = setInterval(() => {
    document.getElementById('birdLove').style.backgroundPosition = `-${position}px 0px`;
    // Template literal to insert the variable 'position'
    if (position < 1280) {
      position += diff;
    } else { // we increment the position by 640 each time
      position = 0;
    }
    // reset the position to 0px, once position exceeds 4480px
  }, interval); // end of setInterval
}; // end of animateAnimalState()

const birdRip = () => {
  let position = 0; // start position for the image slicer
  const interval = 500; // 500 ms of interval for the setInterval()
  const diff = 640; // diff as a variable for position offset
  tID = setInterval(() => {
    document.getElementById('birdRip').style.backgroundPosition = `-${position}px 0px`;
    // Template literal to insert the variable 'position'
    if (position < 1280) {
      position += diff;
    } else { // we increment the position by 640 each time
      position = 0;
    }
    // reset the position to 0px, once position exceeds 4480px
  }, interval); // end of setInterval
}; // end of animateAnimalState()

const birdSick = () => {
  let position = 0; // start position for the image slicer
  const interval = 500; // 500 ms of interval for the setInterval()
  const diff = 640; // diff as a variable for position offset
  tID = setInterval(() => {
    document.getElementById('birdSick').style.backgroundPosition = `-${position}px 0px`;
    // Template literal to insert the variable 'position'
    if (position < 1280) {
      position += diff;
    } else { // we increment the position by 640 each time
      position = 0;
    }
    // reset the position to 0px, once position exceeds 4480px
  }, interval); // end of setInterval
}; // end of animateAnimalState()

const fishBathroom = () => {
  let position = 0; // start position for the image slicer
  const interval = 500; // 500 ms of interval for the setInterval()
  const diff = 640; // diff as a variable for position offset
  tID = setInterval(() => {
    document.getElementById('fishBathroom').style.backgroundPosition = `-${position}px 0px`;
    // Template literal to insert the variable 'position'
    if (position < 1280) {
      position += diff;
    } else { // we increment the position by 640 each time
      position = 0;
    }
    // reset the position to 0px, once position exceeds 4480px
  }, interval); // end of setInterval
}; // end of animateAnimalState()

const fishBored = () => {
  let position = 0; // start position for the image slicer
  const interval = 500; // 500 ms of interval for the setInterval()
  const diff = 640; // diff as a variable for position offset
  tID = setInterval(() => {
    document.getElementById('fishBored').style.backgroundPosition = `-${position}px 0px`;
    // Template literal to insert the variable 'position'
    if (position < 1280) {
      position += diff;
    } else { // we increment the position by 640 each time
      position = 0;
    }
    // reset the position to 0px, once position exceeds 4480px
  }, interval); // end of setInterval
}; // end of animateAnimalState()

const fishDefault = () => {
  let position = 0; // start position for the image slicer
  const interval = 500; // 500 ms of interval for the setInterval()
  const diff = 640; // diff as a variable for position offset
  tID = setInterval(() => {
    document.getElementById('fishDefault').style.backgroundPosition = `-${position}px 0px`;
    // Template literal to insert the variable 'position'
    if (position < 1280) {
      position += diff;
    } else { // we increment the position by 640 each time
      position = 0;
    }
    // reset the position to 0px, once position exceeds 4480px
  }, interval); // end of setInterval
}; // end of animateAnimalState()

const fishExercise = () => {
  let position = 0; // start position for the image slicer
  const interval = 500; // 500 ms of interval for the setInterval()
  const diff = 640; // diff as a variable for position offset
  tID = setInterval(() => {
    document.getElementById('fishExercise').style.backgroundPosition = `-${position}px 0px`;
    // Template literal to insert the variable 'position'
    if (position < 1280) {
      position += diff;
    } else { // we increment the position by 640 each time
      position = 0;
    }
    // reset the position to 0px, once position exceeds 4480px
  }, interval); // end of setInterval
}; // end of animateAnimalState()

const fishFatigue = () => {
  let position = 0; // start position for the image slicer
  const interval = 500; // 500 ms of interval for the setInterval()
  const diff = 640; // diff as a variable for position offset
  tID = setInterval(() => {
    document.getElementById('fishFatigue').style.backgroundPosition = `-${position}px 0px`;
    // Template literal to insert the variable 'position'
    if (position < 1280) {
      position += diff;
    } else { // we increment the position by 640 each time
      position = 0;
    }
    // reset the position to 0px, once position exceeds 4480px
  }, interval); // end of setInterval
}; // end of animateAnimalState()

const fishHungry = () => {
  let position = 0; // start position for the image slicer
  const interval = 500; // 500 ms of interval for the setInterval()
  const diff = 640; // diff as a variable for position offset
  tID = setInterval(() => {
    document.getElementById('fishHungry').style.backgroundPosition = `-${position}px 0px`;
    // Template literal to insert the variable 'position'
    if (position < 1280) {
      position += diff;
    } else { // we increment the position by 640 each time
      position = 0;
    }
    // reset the position to 0px, once position exceeds 4480px
  }, interval); // end of setInterval
}; // end of animateAnimalState()

const fishLove = () => {
  let position = 0; // start position for the image slicer
  const interval = 500; // 500 ms of interval for the setInterval()
  const diff = 640; // diff as a variable for position offset
  tID = setInterval(() => {
    document.getElementById('fishLove').style.backgroundPosition = `-${position}px 0px`;
    // Template literal to insert the variable 'position'
    if (position < 1280) {
      position += diff;
    } else { // we increment the position by 640 each time
      position = 0;
    }
    // reset the position to 0px, once position exceeds 4480px
  }, interval); // end of setInterval
}; // end of animateAnimalState()

const fishRip = () => {
  let position = 0; // start position for the image slicer
  const interval = 500; // 500 ms of interval for the setInterval()
  const diff = 640; // diff as a variable for position offset
  tID = setInterval(() => {
    document.getElementById('fishRip').style.backgroundPosition = `-${position}px 0px`;
    // Template literal to insert the variable 'position'
    if (position < 1280) {
      position += diff;
    } else { // we increment the position by 640 each time
      position = 0;
    }
    // reset the position to 0px, once position exceeds 4480px
  }, interval); // end of setInterval
}; // end of animateAnimalState()

const fishSick = () => {
  let position = 0; // start position for the image slicer
  const interval = 500; // 500 ms of interval for the setInterval()
  const diff = 640; // diff as a variable for position offset
  tID = setInterval(() => {
    document.getElementById('fishSick').style.backgroundPosition = `-${position}px 0px`;
    // Template literal to insert the variable 'position'
    if (position < 1280) {
      position += diff;
    } else { // we increment the position by 640 each time
      position = 0;
    }
    // reset the position to 0px, once position exceeds 4480px
  }, interval); // end of setInterval
}; // end of animateAnimalState()

const mammalBathroom = () => {
  let position = 0; // start position for the image slicer
  const interval = 500; // 500 ms of interval for the setInterval()
  const diff = 640; // diff as a variable for position offset
  tID = setInterval(() => {
    document.getElementById('mammalBathroom').style.backgroundPosition = `-${position}px 0px`;
    // Template literal to insert the variable 'position'
    if (position < 1280) {
      position += diff;
    } else { // we increment the position by 640 each time
      position = 0;
    }
    // reset the position to 0px, once position exceeds 4480px
  }, interval); // end of setInterval
}; // end of animateAnimalState()

const mammalBored = () => {
  let position = 0; // start position for the image slicer
  const interval = 500; // 500 ms of interval for the setInterval()
  const diff = 640; // diff as a variable for position offset
  tID = setInterval(() => {
    document.getElementById('mammalBored').style.backgroundPosition = `-${position}px 0px`;
    // Template literal to insert the variable 'position'
    if (position < 1280) {
      position += diff;
    } else { // we increment the position by 640 each time
      position = 0;
    }
    // reset the position to 0px, once position exceeds 4480px
  }, interval); // end of setInterval
}; // end of animateAnimalState()

const mammalDefault = () => {
  let position = 0; // start position for the image slicer
  const interval = 500; // 500 ms of interval for the setInterval()
  const diff = 640; // diff as a variable for position offset
  tID = setInterval(() => {
    document.getElementById('mammalDefault').style.backgroundPosition = `-${position}px 0px`;
    // Template literal to insert the variable 'position'
    if (position < 1280) {
      position += diff;
    } else { // we increment the position by 640 each time
      position = 0;
    }
    // reset the position to 0px, once position exceeds 4480px
  }, interval); // end of setInterval
}; // end of animateAnimalState()

const mammalExercise = () => {
  let position = 0; // start position for the image slicer
  const interval = 500; // 500 ms of interval for the setInterval()
  const diff = 640; // diff as a variable for position offset
  tID = setInterval(() => {
    document.getElementById('mammalExercise').style.backgroundPosition = `-${position}px 0px`;
    // Template literal to insert the variable 'position'
    if (position < 1280) {
      position += diff;
    } else { // we increment the position by 640 each time
      position = 0;
    }
    // reset the position to 0px, once position exceeds 4480px
  }, interval); // end of setInterval
}; // end of animateAnimalState()

const mammalFatigue = () => {
  let position = 0; // start position for the image slicer
  const interval = 500; // 500 ms of interval for the setInterval()
  const diff = 640; // diff as a variable for position offset
  tID = setInterval(() => {
    document.getElementById('mammalFatigue').style.backgroundPosition = `-${position}px 0px`;
    // Template literal to insert the variable 'position'
    if (position < 1280) {
      position += diff;
    } else { // we increment the position by 640 each time
      position = 0;
    }
    // reset the position to 0px, once position exceeds 4480px
  }, interval); // end of setInterval
}; // end of animateAnimalState()

const mammalHungry = () => {
  let position = 0; // start position for the image slicer
  const interval = 500; // 500 ms of interval for the setInterval()
  const diff = 640; // diff as a variable for position offset
  tID = setInterval(() => {
    document.getElementById('mammalHungry').style.backgroundPosition = `-${position}px 0px`;
    // Template literal to insert the variable 'position'
    if (position < 1280) {
      position += diff;
    } else { // we increment the position by 640 each time
      position = 0;
    }
    // reset the position to 0px, once position exceeds 4480px
  }, interval); // end of setInterval
}; // end of animateAnimalState()

const mammalLove = () => {
  let position = 0; // start position for the image slicer
  const interval = 500; // 500 ms of interval for the setInterval()
  const diff = 640; // diff as a variable for position offset
  tID = setInterval(() => {
    document.getElementById('mammalLove').style.backgroundPosition = `-${position}px 0px`;
    // Template literal to insert the variable 'position'
    if (position < 1280) {
      position += diff;
    } else { // we increment the position by 640 each time
      position = 0;
    }
    // reset the position to 0px, once position exceeds 4480px
  }, interval); // end of setInterval
}; // end of animateAnimalState()

const mammalRip = () => {
  let position = 0; // start position for the image slicer
  const interval = 500; // 500 ms of interval for the setInterval()
  const diff = 640; // diff as a variable for position offset
  tID = setInterval(() => {
    document.getElementById('mammalRip').style.backgroundPosition = `-${position}px 0px`;
    // Template literal to insert the variable 'position'
    if (position < 1280) {
      position += diff;
    } else { // we increment the position by 640 each time
      position = 0;
    }
    // reset the position to 0px, once position exceeds 4480px
  }, interval); // end of setInterval
}; // end of animateAnimalState()

const mammalSick = () => {
  let position = 0; // start position for the image slicer
  const interval = 500; // 500 ms of interval for the setInterval()
  const diff = 640; // diff as a variable for position offset
  tID = setInterval(() => {
    document.getElementById('mammalSick').style.backgroundPosition = `-${position}px 0px`;
    // Template literal to insert the variable 'position'
    if (position < 1280) {
      position += diff;
    } else { // we increment the position by 640 each time
      position = 0;
    }
    // reset the position to 0px, once position exceeds 4480px
  }, interval); // end of setInterval
}; // end of animateAnimalState()

const turtleBathroom = () => {
  let position = 0; // start position for the image slicer
  const interval = 500; // 500 ms of interval for the setInterval()
  const diff = 640; // diff as a variable for position offset
  tID = setInterval(() => {
    document.getElementById('turtleBathroom').style.backgroundPosition = `-${position}px 0px`;
    // Template literal to insert the variable 'position'
    if (position < 1280) {
      position += diff;
    } else { // we increment the position by 640 each time
      position = 0;
    }
    // reset the position to 0px, once position exceeds 4480px
  }, interval); // end of setInterval
}; // end of animateAnimalState()

const turtleBored = () => {
  let position = 0; // start position for the image slicer
  const interval = 500; // 500 ms of interval for the setInterval()
  const diff = 640; // diff as a variable for position offset
  tID = setInterval(() => {
    document.getElementById('turtleBored').style.backgroundPosition = `-${position}px 0px`;
    // Template literal to insert the variable 'position'
    if (position < 1280) {
      position += diff;
    } else { // we increment the position by 640 each time
      position = 0;
    }
    // reset the position to 0px, once position exceeds 4480px
  }, interval); // end of setInterval
}; // end of animateAnimalState()

const turtleDefault = () => {
  let position = 0; // start position for the image slicer
  const interval = 500; // 500 ms of interval for the setInterval()
  const diff = 640; // diff as a variable for position offset
  tID = setInterval(() => {
    document.getElementById('turtleDefault').style.backgroundPosition = `-${position}px 0px`;
    // Template literal to insert the variable 'position'
    if (position < 1280) {
      position += diff;
    } else { // we increment the position by 640 each time
      position = 0;
    }
    // reset the position to 0px, once position exceeds 4480px
  }, interval); // end of setInterval
}; // end of animateAnimalState()

const turtleExercise = () => {
  let position = 0; // start position for the image slicer
  const interval = 500; // 500 ms of interval for the setInterval()
  const diff = 640; // diff as a variable for position offset
  tID = setInterval(() => {
    document.getElementById('turtleExercise').style.backgroundPosition = `-${position}px 0px`;
    // Template literal to insert the variable 'position'
    if (position < 1280) {
      position += diff;
    } else { // we increment the position by 640 each time
      position = 0;
    }
    // reset the position to 0px, once position exceeds 4480px
  }, interval); // end of setInterval
}; // end of animateAnimalState()

const turtleFatigue = () => {
  let position = 0; // start position for the image slicer
  const interval = 500; // 500 ms of interval for the setInterval()
  const diff = 640; // diff as a variable for position offset
  tID = setInterval(() => {
    document.getElementById('turtleFatigue').style.backgroundPosition = `-${position}px 0px`;
    // Template literal to insert the variable 'position'
    if (position < 1280) {
      position += diff;
    } else { // we increment the position by 640 each time
      position = 0;
    }
    // reset the position to 0px, once position exceeds 4480px
  }, interval); // end of setInterval
}; // end of animateAnimalState()

const turtleHungry = () => {
  let position = 0; // start position for the image slicer
  const interval = 500; // 500 ms of interval for the setInterval()
  const diff = 640; // diff as a variable for position offset
  tID = setInterval(() => {
    document.getElementById('turtleHungry').style.backgroundPosition = `-${position}px 0px`;
    // Template literal to insert the variable 'position'
    if (position < 1280) {
      position += diff;
    } else { // we increment the position by 640 each time
      position = 0;
    }
    // reset the position to 0px, once position exceeds 4480px
  }, interval); // end of setInterval
}; // end of animateAnimalState()

const turtleLove = () => {
  let position = 0; // start position for the image slicer
  const interval = 500; // 500 ms of interval for the setInterval()
  const diff = 640; // diff as a variable for position offset
  tID = setInterval(() => {
    document.getElementById('turtleLove').style.backgroundPosition = `-${position}px 0px`;
    // Template literal to insert the variable 'position'
    if (position < 1280) {
      position += diff;
    } else { // we increment the position by 640 each time
      position = 0;
    }
    // reset the position to 0px, once position exceeds 4480px
  }, interval); // end of setInterval
}; // end of animateAnimalState()

const turtleRip = () => {
  let position = 0; // start position for the image slicer
  const interval = 500; // 500 ms of interval for the setInterval()
  const diff = 640; // diff as a variable for position offset
  tID = setInterval(() => {
    document.getElementById('turtleRip').style.backgroundPosition = `-${position}px 0px`;
    // Template literal to insert the variable 'position'
    if (position < 1280) {
      position += diff;
    } else { // we increment the position by 640 each time
      position = 0;
    }
    // reset the position to 0px, once position exceeds 4480px
  }, interval); // end of setInterval
}; // end of animateAnimalState()

const turtleSick = () => {
  let position = 0; // start position for the image slicer
  const interval = 500; // 500 ms of interval for the setInterval()
  const diff = 640; // diff as a variable for position offset
  tID = setInterval(() => {
    document.getElementById('turtleSick').style.backgroundPosition = `-${position}px 0px`;
    // Template literal to insert the variable 'position'
    if (position < 1280) {
      position += diff;
    } else { // we increment the position by 640 each time
      position = 0;
    }
    // reset the position to 0px, once position exceeds 4480px
  }, interval); // end of setInterval
}; // end of animateAnimalState()

const clean = () => {
  let position = 0; // start position for the image slicer
  const interval = 500; // 500 ms of interval for the setInterval()
  const diff = 640; // diff as a variable for position offset
  tID = setInterval(() => {
    document.getElementById('clean').style.backgroundPosition = `-${position}px 0px`;
    // Template literal to insert the variable 'position'
    if (position < 1280) {
      position += diff;
    } else { // we increment the position by 640 each time
      position = 0;
    }
    // reset the position to 0px, once position exceeds 4480px
  }, interval); // end of setInterval
}; // end of animateAnimalState()

const exercise = () => {
  let position = 0; // start position for the image slicer
  const interval = 500; // 500 ms of interval for the setInterval()
  const diff = 640; // diff as a variable for position offset
  tID = setInterval(() => {
    document.getElementById('exercise').style.backgroundPosition = `-${position}px 0px`;
    // Template literal to insert the variable 'position'
    if (position < 1280) {
      position += diff;
    } else { // we increment the position by 640 each time
      position = 0;
    }
    // reset the position to 0px, once position exceeds 4480px
  }, interval); // end of setInterval
}; // end of animateAnimalState()

const fatigue = () => {
  let position = 0; // start position for the image slicer
  const interval = 500; // 500 ms of interval for the setInterval()
  const diff = 640; // diff as a variable for position offset
  tID = setInterval(() => {
    document.getElementById('fatigue').style.backgroundPosition = `-${position}px 0px`;
    // Template literal to insert the variable 'position'
    if (position < 1280) {
      position += diff;
    } else { // we increment the position by 640 each time
      position = 0;
    }
    // reset the position to 0px, once position exceeds 4480px
  }, interval); // end of setInterval
}; // end of animateAnimalState()

const feed = () => {
  let position = 0; // start position for the image slicer
  const interval = 500; // 500 ms of interval for the setInterval()
  const diff = 640; // diff as a variable for position offset
  tID = setInterval(() => {
    document.getElementById('feed').style.backgroundPosition = `-${position}px 0px`;
    // Template literal to insert the variable 'position'
    if (position < 1280) {
      position += diff;
    } else { // we increment the position by 640 each time
      position = 0;
    }
    // reset the position to 0px, once position exceeds 4480px
  }, interval); // end of setInterval
}; // end of animateAnimalState()

const love = () => {
  let position = 0; // start position for the image slicer
  const interval = 500; // 500 ms of interval for the setInterval()
  const diff = 640; // diff as a variable for position offset
  tID = setInterval(() => {
    document.getElementById('love').style.backgroundPosition = `-${position}px 0px`;
    // Template literal to insert the variable 'position'
    if (position < 1280) {
      position += diff;
    } else { // we increment the position by 640 each time
      position = 0;
    }
    // reset the position to 0px, once position exceeds 4480px
  }, interval); // end of setInterval
}; // end of animateAnimalState()

const rip= () => {
  let position = 0; // start position for the image slicer
  const interval = 500; // 500 ms of interval for the setInterval()
  const diff = 640; // diff as a variable for position offset
  tID = setInterval(() => {
    document.getElementById('rip').style.backgroundPosition = `-${position}px 0px`;
    // Template literal to insert the variable 'position'
    if (position < 1280) {
      position += diff;
    } else { // we increment the position by 640 each time
      position = 0;
    }
    // reset the position to 0px, once position exceeds 4480px
  }, interval); // end of setInterval
}; // end of animateAnimalState()

const sick = () => {
  let position = 0; // start position for the image slicer
  const interval = 500; // 500 ms of interval for the setInterval()
  const diff = 640; // diff as a variable for position offset
  tID = setInterval(() => {
    document.getElementById('sick').style.backgroundPosition = `-${position}px 0px`;
    // Template literal to insert the variable 'position'
    if (position < 1280) {
      position += diff;
    } else { // we increment the position by 640 each time
      position = 0;
    }
    // reset the position to 0px, once position exceeds 4480px
  }, interval); // end of setInterval
}; // end of animateAnimalState()
