//Basic animation code, to be inserted into the html
//<div id="demo">
//  <p id="image" onmouseover="animateScript()" onmouseout="stopAnimate()">

//  </p>
//</div>

let tID; //we will use this variable to clear the setInterval()

const stopAnimate = () => {
    clearInterval(tID);
} //end of stopAnimate()


const animateScript = () => {

    let position = 0; //start position for the image slicer
    const interval = 500; //500 ms of interval for the setInterval()
    const diff = 640; //diff as a variable for position offset

    tID = setInterval(() => {

        document.getElementById("image").style.backgroundPosition =
            `-${position}px 0px`;
        //Template literal to insert the variable "position"

        if (position < 4480) {
            position = position + diff;
        }
        //we increment the position by 640 each time
        else {
            position = 0;
        }
        //reset the position to 0px, once position exceeds 4480px

    }, interval); //end of setInterval
} //end of animateScript()
