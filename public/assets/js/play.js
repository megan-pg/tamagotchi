// INITIAL PAGE LOAD
$(async () => {
  // todo add some validation here, if there's no/null values from getClientCreds
  // don't bother with the db call
  const obj = getClientCreds();
  const userStr = obj.username;
  const animal = await getAnimal(obj, userStr);
  localStorage.setItem('animal-uuid', JSON.stringify(animal.msg[0].uuid));
  populateAnimalStats(animal.msg[0]);
  startGame();
});

async function getAnimal(creds, user) {
  const url = window.location.href.split('/');
  const animal = url[url.length - 1]; // todo not sure if there's a better way to go about this

  return $.ajax({
    url: `/api/users/${user}/${animal}`,
    type: 'post',
    headers: {
      authorization: creds.token,
    },
    dataType: 'json',
  })
    .then(async (result) => result)
    .fail((result) => {
      // todo add a toast here
      console.log(result);
    });
}

function getClientCreds() {
  const obj = {
    token: JSON.parse(localStorage.getItem('accessToken')),
    uuid: JSON.parse(localStorage.getItem('uuid')),
    username: JSON.parse(localStorage.getItem('username')),
  };

  return obj;
}

function populateAnimalStats(animal) {
  // const { fatigue, hungry, sick, bathroom, bored, boredom, health, unhealthy} = animal;
  const type = animal.species;
  // todo some math for calculating state
  const state = animal.fatigue;
  const stats = Object.entries(animal).map(([key, val]) => `<li>${key}: ${val}</li>`).join('');
  const display = `<div class="waves-effect" id="animalBox">
      <div class="valign-wrapper">
          <img 
          src="/assets/concept-art/${type}-tamagotchi/img/${type}_${state}.png"
          style="max-width:80px; height: 80px;border-radius:50%;"
          / >
          <div class="title">
            <ul>
              ${stats}
            </ul>
          </div>
          <i class="material-icons ml-auto"><i class="${'fas fa-poop'}"></i></i>
      </div>
    </div>`;
  $('#animalBox').remove();
  $('#animal').append(display);
}

async function updateStats(data, creds) {
  return $.ajax({
    url: '/api/animals/clock',
    type: 'put',
    data,
    headers: {
      authorization: creds.token,
    },
    dataType: 'json',
  })
    .then(async (result) => result)
    .fail((result) => {
      // todo add a toast here
      console.log(result);
    });
}

async function updateStat(data, creds) {
  return $.ajax({
    url: '/api/animals/update',
    type: 'put',
    data,
    headers: {
      authorization: creds.token,
    },
    dataType: 'json',
  })
    .then(async (result) => result)
    .fail((result) => {
      // todo add a toast here
      console.log(result);
    });
}

async function refreshScreen(action) {
  const obj = getClientCreds();
  const userStr = obj.username;
  const uuid = JSON.parse(localStorage.getItem('animal-uuid'));

  if (action) {
    await updateStat({ uuid, action }, getClientCreds());
  } else {
    await updateStats({ uuid }, getClientCreds());
  }

  const animal = await getAnimal(obj, userStr);
  populateAnimalStats(animal.msg[0]);

  if (animal.msg[0].unhealthy === true && !action) {
    $('#negative')[0].play();
  } else {
    $('#positive')[0].play();
  }
}

function startGame() {
  //timer
  //every minute call updatestats
  // then populateanimalstats
}

$('.updateStat').click(async function() {
  let action;
  switch (this.id) {
    case 'feed':
      action = 'hunger';
      break;
    case 'sleep':
      action = 'fatigue';
      break;
    case 'clean':
      action = 'bathroom';
      break;
    case 'medicine':
      action = 'sick';
      break;
    case 'play':
      action = 'boredom';
      break;
    case 'love':
      action = 'bored';
      break;
    default:
      action = 'hunger';
  }
  refreshScreen(action);
});

// todo move event listeners outside of this function, the buttons need not be dynamic above 
$('#clock').click(async () => {
  refreshScreen();
});


// onclick="document.getElementById('play').play()"

//variable for starting the timer with the start button
// const startEl = document.querySelector("#start");

// // set seconds to what it starts at
// const secondsStart = 0;
// //start of function timer function
// setTime() => {
//   timerInterval = setInterval(function () {
//     //addition of seconds from the timer
//     secondsStart++;
//     //what I want to populate to the page in textContent
//     timeEl.textContent = "Time: " + secondsStart;

//     //if statement saying if counter is zero stop the timer
//     if (secondsStart === 100) {
//       clearInterval(timerInterval);
//     }
//     // counting in milliseconds
//   }, 1000);
// }

// //start timer when start button is clicked function
// startEl.onclick = startBtn;
// startBtn() => {
//   setTime();
// }


// // js for buttons //

// $(document).ready(function () {
//   $("#hunger").on("click", function (event) {
//     event.preventDefault();
//     var id = $(this).data("id");
//     // console.log(id);
//     $.ajax({ url: "X" + id, method: "PUT" })

//       .then(function (data) {
//         console.log(data);
//         location.reload();
//       });
//   });

