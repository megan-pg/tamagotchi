// INITIAL PAGE LOAD
$(async () => {
  // todo add some validation here, if there's no/null values from getClientCreds
  // don't bother with the db call
  const obj = getClientCreds();
  const userStr = obj.username;
  const getAnimals = await getAnimalList(obj, userStr);
  populateAnimalsList(getAnimals.msg, userStr);
});

async function getAnimalList(creds, user) {
  console.log(user)
  return $.ajax({
    url: `/api/users/${user}/animals`,
    type: 'post',
    headers: {
      authorization: creds.token,
    },
    dataType: 'json',
  })
    .then(async (result) => {
      if (result.status === 200) {
        return result;
      }
      throw new Error(result.status);
    })
    .fail((err) => {
      if (err.status === 404 || err.status === '404') {
        // 404 error will show on first load, as a user has not created any animals yet
        // is there a way that should be handled?
      } else if (err.status === 401 || err.status === '401') {
        window.location.assign('/login');
        // todo make a toast pop telling them they've been unauthenticated
      } else {
        console.log(err);
      }
    });
}

async function createAnimal(creds, data) {
  return $.ajax({
    url: '/api/animals/create',
    type: 'post',
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

function getClientCreds() {
  const obj = {
    token: JSON.parse(localStorage.getItem('accessToken')),
    uuid: JSON.parse(localStorage.getItem('uuid')),
    username: JSON.parse(localStorage.getItem('username')),
  };

  return obj;
}

function populateAnimalsList(animals, user) {
  $('.animal').remove();
  // const { fatigue, hungry, sick, bathroom, bored, boredom, health, unhealthy} = animal;
  // todo some math for calculating state
  // todo if dead change poop icon to dead and add a delete button
  const state = 'bored';
  animals.forEach((animal, index) => {
    const display = `<li class="waves-effect animal" id="${animal.name}" data-animal="${animal.uuid}" style="padding-bottom: 5px;">
      <div class="valign-wrapper">
          <img 
          src="/assets/concept-art/${animal.species}-tamagotchi/img/${animal.species}_${state}.png"
          style="max-width:80px; height: 80px;border-radius:50%;"
          / >
          <div class="title">
              ${animal.name}<br>
              <span>${animal.createdAt}</span>
              <br>
              <span>${animal.species}</span>
              <span>${animal.dead ? 'dead' : ''}</span>

          </div>
          <i class="material-icons ml-auto"><i class="${'fas fa-poop'}"></i></i>
      </div>
    </li>`;
    // <i class="material-icons left circle white-text"></i>
    $('#animals').append(display);
    $(`#${animal.name}`).click(() => {
      window.location.assign(`/play/${user}/${animal.name}`);
    });
  });
}

function validateInputs(obj) {
  const inputs = Object.entries(obj).filter(([key, val]) => val.length === 0);

  if (inputs.length > 0) {
    const required = inputs.map(([key, val]) => `${key}: is required.`);
    return required;
  }

  return true;
}

// OPEN LITTLE FORM
$('#addNewButton').click(() => {
  $('#addNewForm').toggleClass('active');
});

// CREATE A NEW ANIMAL
$('#createAnimal').click(async () => {
  const creds = getClientCreds();
  const userStr = creds.username;
  const obj = {
    name: $('#name').val(),
    difficulty: $('#difficulty').val(),
    species: $('#species').val(),
    UserUuid: creds.uuid,
  };
  const valid = validateInputs(obj);

  // todo create a toast or some on screen notification for the following console.logs
  if (Array.isArray(valid)) {
    valid.map((item) => console.log(item));
  } else {

    await createAnimal(creds, obj)
      .then(async () => {
        const getAnimals = await getAnimalList(creds, userStr);
        populateAnimalsList(getAnimals.msg, userStr);
      });
  }
});
