// todo display a progress bar of unhealthy intervals
let unhealthyIntervals = 0;
let dead;

// INITIAL PAGE LOAD
$(async () => {
  // todo add some validation here, if there's no/null values from getClientCreds
  // don't bother with the db call
  const obj = getClientCreds();
  const animal = await getAnimal(obj);
  localStorage.setItem('animal-uuid', JSON.stringify(animal.msg[0].uuid)); // to call it elsewhere

  if (!animal.msg[0].dead) {
    startGame();
  } else {
    dead = true;
  }
  populateAnimalStats(animal.msg[0]);
});

function getClientCreds() {
  const obj = {
    token: JSON.parse(localStorage.getItem('accessToken')),
    uuid: JSON.parse(localStorage.getItem('uuid')),
    username: JSON.parse(localStorage.getItem('username')),
  };

  return obj;
}

async function getAnimal(creds) {
  const url = window.location.href.split('/');
  const animal = url[url.length - 1]; // todo not sure if there's a better way to go about this

  return $.ajax({
    url: `/api/users/${creds.username}/${animal}`,
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

function populateAnimalStats(animal) {
  const atts = ['hunger', 'bathroom', 'boredom', 'health'];
  const bools = ['fatigue', 'sick', 'bored', 'unhealthy', 'dead'];
  const type = animal.species;
  const state = dead ? 'rip' : calculateStatus(animal);
  let stats = Object.entries(animal)
    .map(([key, val]) => {
      if (atts.includes(key)) {
        return `<li>${key}: ${val} <div class="progress">
        <div class="determinate" style="width: ${val * 10}%"></div></div></li>`;
      }
      if (bools.includes(key)) {
        return `<li>${key}: ${val} <i class="fa fa-${val ? 'check' : 'times'}" aria-hidden="true"></i></li>`;
      }
      return `<li>${key}: ${val}</li>`;
    });

  stats.push(`<li>unhealthy intervals: ${unhealthyIntervals}</li>`);
  stats = stats.join('');

  const display = `<div class="waves-effect" id="animalBox">
      <div class="valign-wrapper">      
        <div class="title">
          <ul>
            ${stats}
          </ul>
        </div>
      </div>
    </div>`;

  $('#animalBox').remove();
  $('#animal').append(display);
  updateImage(type, state);
  animateState();
}

async function refreshScreen(action, animate) {
  const obj = getClientCreds();
  const uuid = JSON.parse(localStorage.getItem('animal-uuid'));

  if (action) {
    await updateStat({ uuid, action }, getClientCreds());
    if (animate === 'sleep' || animate === 'medicine' || animate === 'love') {
      await updateStat({ uuid, action }, getClientCreds()); // double effective !!!
    }
  } else {
    await updateStats({ uuid }, getClientCreds());
    $('.updateStat').attr('disabled', false);
  }

  const animal = await getAnimal(obj);
  populateAnimalStats(animal.msg[0]);

  if (!dead) {
    if (animal.msg[0].unhealthy === true && !action) {
      unhealthyIntervals += 1;
      $('#negative')[0].play();
    } else if (animal.msg[0].unhealthy === false && !action) {
      $('#postive')[0].play();
    } else if (animal.msg[0].unhealthy === false && unhealthyIntervals > 0) {
      unhealthyIntervals = 0;
      updateImage(false, animate);
      $('#positive')[0].play();
    } else if (action) {
      updateImage(false, animate);
      $('#positive')[0].play();
    } else {
      updateImage(animal.msg[0].type, action);
      $('#positive')[0].play();
    }
  } else {
    // play dead song
    // $('#rip')[0].play();
    updateImage(false, 'rip');
  }
}

function isDead() {
  // if animal has been unhealthy for 5 intervals ~ 50 seconds
  if (unhealthyIntervals > 500) {
    dead = true;
    return true;
  }
  return false;
}

function showPowerBtn() {
  const arr = ['sleep', 'medicine', 'love'];
  const rand = Math.floor(Math.random() * (2 - 0) + 0);
  $(`#${arr[rand]}`).toggleClass('active');
}

function hidePowerBtn() {
  const arr = ['sleep', 'medicine', 'love'];
  arr.forEach((id) => {
    $(`#${id}`).addClass('active');
  });
}

function startGame() {
  let sec = 0;
  const timerInterval = setInterval(() => {
    sec += 1;
    if (isDead()) {
      clearInterval(timerInterval);
      refreshScreen('dead');
    }
    if (sec % 10 === 0) {
      refreshScreen();
      hidePowerBtn();
    }
    if (sec % 60 === 0) {
      showPowerBtn();
    }
  }, 1000);
}

function calculateStatus(animal) {
  const { fatigue, hunger, sick, bathroom, bored, boredom } = animal;
  const arr = [
    { name: 'hunger', val: hunger },
    { name: 'bathroom', val: bathroom },
    { name: 'boredom', val: boredom },
  ];

  if (sick) {
    return 'sick';
  }
  if (fatigue) {
    return 'fatigue';
  }
  if (bored) {
    return 'bored';
  }

  arr.sort((a, b) => a.val - b.val);

  return arr[0].name;
}

function updateImage(animalType, animalState) {
  let animation;
  if (animalType) {
    animation = `/assets/sprite-sheet/sheet/${animalType}/${animalState}_sprite_sheet.png`;
  } else {
    animation = `/assets/sprite-sheet/sheet/${animalState}_sprite_sheet.png`;
  }
  $('#view-screen').css('background-image', `url(${animation})`);
}

let tID; // we will use this variable to clear the setInterval()

const stopAnimate = () => {
  clearInterval(tID);
};

const animateState = () => {
  const elWidth = $('#view-screen').css('width');
  const diff = parseInt(elWidth.match(/(\d+)/)[0], 10);

  let position = 0; // start position for the image slicer
  const interval = 500; // 500 ms of interval for the setInterval()
  tID = setInterval(() => {
    // todo this is px based, css sheet has ems, might see some weirdness
    document.getElementById('view-screen').style.backgroundPosition = `-${position}px 0px`;
    // Template literal to insert the variable 'position'
    if (position < (diff * 2)) {
      position += diff;
    } else { 
      position = 0;
    }
    // reset the position to 0px, once position exceeds 4480px
  }, interval);
};

// USER INPUT
$('.updateStat').click(async function () {
  if (!dead) {
    $(this).attr('disabled', true);
    let action;
    switch (this.id) {
      case 'feed':
        action = 'hunger';
        break;
      case 'sleep':
        action = 'hunger';
        break;
      case 'clean':
        action = 'bathroom';
        break;
      case 'medicine':
        action = 'bathroom';
        break;
      case 'play':
        action = 'boredom';
        break;
      case 'love':
        action = 'boredom';
        break;
      default:
        action = 'hunger';
    }
    refreshScreen(action, this.id);
  }
});
