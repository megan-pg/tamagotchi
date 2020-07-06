// INITIAL PAGE LOAD
$(async () => {
  // todo add some validation here, if there's no/null values from getClientCreds
  // don't bother with the db call
  const obj = getClientCreds();
  const userStr = obj.username;
  const animal = await getAnimal(obj, userStr);
  populateAnimalStats(animal.msg[0]);
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
  const type = 'bird';
  const state = 'bored';
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
      <button type="button" id="clock">Update all Stats (clock test)</button>
      <button type="button" id="feed">Update Stat: hunger</button>
    </div>`;
  $('#animalBox').remove();
  $('#animal').append(display);
// todo move event listeners outside of this function, the buttons need not be dynamic above 
  $('#clock').click(async () => {
    const obj = getClientCreds();
    const userStr = obj.username;
    await updateStats({ uuid: animal.uuid }, getClientCreds());
    const dude = await getAnimal(obj, userStr);
    populateAnimalStats(dude.msg[0]);
  });

  $('#feed').click(async () => {
    const obj = getClientCreds();
    const userStr = obj.username;
    updateStat({ uuid: animal.uuid, action: 'hunger' }, getClientCreds());
    const dude = await getAnimal(obj, userStr);
    populateAnimalStats(dude.msg[0]);
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
// todo might not need this one
// function validateInputs(obj) {
//   const inputs = Object.entries(obj).filter(([key, val]) => val.length === 0);

//   if (inputs.length > 0) {
//     const required = inputs.map(([key, val]) => `${key}: is required.`);
//     return required;
//   }

//   return true;
// }
