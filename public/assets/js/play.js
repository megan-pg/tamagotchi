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
  $('#menu').hide();
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
      M.toast({ html: result.msg });
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
      M.toast({ html: result.msg });
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
      M.toast({ html: result.msg });
    });
}

function populateAnimalStats(animal) {
  const atts = ['hunger', 'bathroom', 'boredom', 'health'];
  const bools = ['fatigue', 'sick', 'bored'];
  const serious = ['unhealthy', 'dead'];
  const type = animal.species;
  const state = dead ? 'rip' : calculateStatus(animal);
  const bars = Object.entries(animal)
    .map(([key, val]) => {
      if (atts.includes(key)) {
        return `<div class="col s12 left-align"><span style="font-weight:bold;">${key}: ${val}</span><span class="progress">
        <div class="determinate grey darken-3" style="width: ${val * 10}%"></div></span></div>`;
      }
    });
  bars.push(`<div class="col s12 left-align"><span style="font-weight:bold;">Unhealthy turns: ${unhealthyIntervals}</span><span class="progress">
    <div class="determinate grey darken-3" style="width: ${unhealthyIntervals * 10}%;"></div></span></div>`);
  const tf = Object.entries(animal)
    .map(([key, val]) => {
      if (bools.includes(key)) {
        return `<span class="tf">${key}: <i class="fa fa-${val ? 'check' : 'times'}" aria-hidden="true"></i></span>`;
      }
    });
  const grave = Object.entries(animal)
    .map(([key, val]) => {
      if (serious.includes(key)) {
        return `<span class="tf">${key}: <i class="fa fa-${val ? 'check' : 'times'}" aria-hidden="true"></i></span>`;
      }
    });
  const display = `<div id="animalBox">
    ${bars.join('')}
   
    <div class="col s12 left-align">${grave.join(' ')}</div>

  </div>`;

  $('#animalBox').remove();
  $('#animal').append(display);
  updateImage(type, state);
  animateState();
}
// THE MONSTER
async function refreshScreen(action, animate) {
  stopAnimate();
  const obj = getClientCreds();
  const uuid = JSON.parse(localStorage.getItem('animal-uuid'));
  const currentAnimal = await getAnimal(obj);
  const status = calculateStatus(currentAnimal.msg[0]);

  if (animate && action !== status) {
    // user input that does not match the creatues most depserate status
    await updateStats({ uuid }, getClientCreds());
  } else if (action) {
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
    if (animal.msg[0].unhealthy === true && !animate) {
      unhealthyIntervals += 1;
      $('#negative')[0].play();
    } else if (animal.msg[0].unhealthy === false && !animate) {
      $('#postive')[0].play();
    } else if (animal.msg[0].unhealthy === false && unhealthyIntervals > 0) {
      unhealthyIntervals = 0;
      updateImage(false, animate);
      $('#positive')[0].play();
    } else if (animate && action === status) {
      updateImage(false, animate);
      $('#positive')[0].play();
    } else if (animate && action !== status) {
      updateImage(animal.msg[0].species, 'boredom');
      $('#negative')[0].play();
    } else {
      updateImage(animal.msg[0].species, action);
      $('#positive')[0].play();
    }
  } else {
    updateImage(false, 'rip');
    $('#rip')[0].play();
  }
}

function isDead() {
  // if animal has been unhealthy for 5 intervals ~ 50 seconds
  if (unhealthyIntervals > 10) {
    dead = true;
    return true;
  }
  return false;
}

function showPowerBtn() {
  const arr = ['sleep', 'medicine', 'love'];
  const rand = Math.floor(Math.random() * (3 - 0) + 0);
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
  const { hunger, bathroom, boredom } = animal;
  const arr = [
    { name: 'hunger', val: hunger },
    { name: 'bathroom', val: bathroom },
    { name: 'boredom', val: boredom },
  ];

  arr.sort((a, b) => b.val - a.val);

  if (arr[0].val === 10 && arr[0].val === arr[2].val) { // if all values are maxed out
    return 'bathroom';
  }
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
  const diff = parseInt(elWidth.match(/(\d+)/)[0], 18);

  let position = 0; // start position for the image slicer
  const interval = 600; // 500 ms of interval for the setInterval()
  tID = setInterval(() => {
    // todo this is px based, css sheet has ems, might see some weirdness
    document.getElementById('view-screen').style.backgroundPosition = `-${position}em 0em`;
    // Template literal to insert the variable 'position'
    if (position < (diff * 2)) {
      position += diff;
    } else {
      position = 0;
    }
    // reset the position to 0px, once position exceeds 4480px
  }, interval);
};

// ----------------------- USER INPUT -----------------------
$('#playPause').click(() => {
  $('#playPause').toggleClass('playing');
  if ($('#playPause').hasClass('playing')) {
    $('#player')[0].play();
  } else {
    $('#player')[0].pause();
  }
});

$('#volUp').click(() => {
  $('#player')[0].volume += 0.1;
});

$('#volDown').click(() => {
  $('#player')[0].volume -= 0.1;
});

$('#showMenu').click(() => {
  $('#menu').slideToggle(400);
});

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

$('.logout').click(() => {
  const { username } = getClientCreds();
  localStorage.setItem('accessToken', JSON.stringify('null')); // to call it elsewhere

  $.ajax({
    url: '/api/users/logout',
    type: 'post',
    data: { username },
    dataType: 'json',
  })
    .then(async (result) => {
      M.toast({ html: result.msg });
    })
    .then(() => {
      window.location.assign('/');
    })
    .fail((result) => {
      M.toast({ html: result.msg });
    });
});

$(document).click(() => {
  $('.sidenav').sidenav();
});
