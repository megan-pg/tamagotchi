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
  return $.ajax({
    url: `/api/users/${user}/animals`,
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

async function createAnimal(creds, data) {
  $.ajax({
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
  // todo these are here for demoing, will need to be added to the db
  const types = ['bird', 'turtle', 'fish', 'mammal'];
  const states = ['bored', 'fatigue', 'hungry', 'love', 'physicality', 'poop', 'rip', 'sick', 'temperature'];
  animals.forEach((animal, index) => {
    const display = `<li class="waves-effect" id="${animal.name}" data-animal="${animal.uuid}" style="padding-bottom: 5px;">
      <div class="valign-wrapper">
          <img 
          src="/assets/concept-art/${types[index % 4]}-tamagotchi/img/${types[index % 4]}_${states[index % 9]}.png"
          style="max-width:80px; height: 80px;border-radius:50%;"
          / >
          <div class="title">
              ${animal.name}<br>
              <span>${animal.createdAt}</span>
          </div>
          <i class="material-icons ml-auto"><i class="${'fas fa-poop'}"></i></i>
      </div>
    </li>`;
    // <i class="material-icons left circle white-text"></i>
    $('#animals').append(display);
    $(`#${animal.name}`).click(() => {
      window.location.replace(`/play/${user}/${animal.name}`);
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
    createAnimal(creds, obj);
    const getAnimals = await getAnimalList(creds, userStr);
    populateAnimalsList(getAnimals.msg, userStr);
  }
});
