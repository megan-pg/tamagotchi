// INITIAL PAGE LOAD
$(async () => {
  // todo add some validation here, if there's no/null values from getClientCreds
  // don't bother with the db call
  const obj = getClientCreds();
  const getAnimals = await getAnimalList(obj);
  populateAnimalsList(getAnimals.msg, obj.username);
  $('.modal').modal();
});

async function getAnimalList(obj) {
  return $.ajax({
    url: `/api/users/${obj.username}/animals`,
    type: 'post',
    headers: {
      authorization: obj.token,
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
        M.toast({ html: err });
      } else if (err.status === 401 || err.status === '401') {
        window.location.assign('/login');
        M.toast({ html: 'You have been unauthenticated.' });
      } else {
        M.toast({ html: err });
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
      M.toast({ html: result });
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
  animals.forEach((animal, index) => {
    const display = `<li class=" animal" style="padding-bottom: 5px;">
      <div class="valign-wrapper">
        <img
          class="waves-effect waves-teal"
          id="${animal.name}"
          src='/assets/concept-art/${animal.dead ? 'miscellaneous/img/rip_example.png' : `${animal.species}-tamagotchi/img/${animal.species}_example.png`}'
          style="max-width:80px; height: 80px;border-radius:50%;" / >
          <div class="title">
              <span class="name">${animal.name} <i class="fas fa-${translateIcon(animal.species)}" aria-hidden="true"></i></span>
              <br>
              <span> Age: ${animal.age}</span>
          </div>
          <span class="ml-auto">${animal.dead ? `<button class="btn delete waves-effect waves-red" type="button" data-uuid=${animal.uuid}>Bury</button>` : ''}</span>
      </div>
    </li>`;

    $('#animals').append(display);
    $(`#${animal.name}`).click(() => {
      window.location.assign(`/play/${user}/${animal.name}`);
    });

    $(`.delete[data-uuid=${animal.uuid}]`).click(async function () {
      const uuid = $(this).attr('data-uuid');
      await deleteAnimal(uuid, getClientCreds());
    });
  });
}

function translateIcon(species) {
  switch (species) {
    case 'bird':
      return 'dove';
    case 'fish':
      return 'fish';
    case 'mammal':
      return 'dog';
    case 'turtle':
      return 'turtle';
    default:
      return 'paw';
  }
}

function validateInputs(obj) {
  const inputs = Object.entries(obj).filter(([key, val]) => val === undefined || val.length === 0);

  if (inputs.length > 0) {
    const required = inputs.map(([key, val]) => `${key}: is required.`);
    return required;
  }

  return true;
}

async function deleteAnimal(uuid, creds) {
  $.ajax({
    url: '/api/animals/delete',
    type: 'delete',
    data: { uuid },
    dataType: 'json',
    headers: {
      authorization: creds.token,
    },
  })
    .then(async (result) => {
      const obj = getClientCreds();
      const getAnimals = await getAnimalList(obj);

      populateAnimalsList(getAnimals.msg, obj.username);
      M.toast({ html: result.msg });
    })
    .fail((result) => {
      M.toast({ html: result.msg });
    });
}

// CREATE A NEW ANIMAL
$('#createAnimal').click(async () => {
  const creds = getClientCreds();
  const obj = {
    name: $('#name').val(),
    difficulty: $('input:radio[name=difficulty]:checked').val(),
    species: $('input:radio[name=species]:checked').val(),
    UserUuid: creds.uuid,
  };
  const valid = validateInputs(obj);

  if (Array.isArray(valid)) {
    valid.map((item) => M.toast({ html: item }));
  } else {
    const getAnimals = await getAnimalList(creds);
    const dupes = getAnimals.msg.filter((animal) => animal.name === obj.name);

    if (dupes.length) {
      M.toast({ html: 'Animal name must be unique.' })
    } else {
      $('#name').val('');
      await createAnimal(creds, obj)
        .then(async () => {
          const getAnimals = await getAnimalList(creds);
          populateAnimalsList(getAnimals.msg, creds.username);
        });
    }
  }
});

$('#logout').click(() => {
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