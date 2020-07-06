// INITIAL PAGE LOAD
$(async () => {
  // todo add some validation here, if there's no/null values from getClientCreds
  // don't bother with the db call
  const obj = getClientCreds();
  const userStr = obj.username;
  const animal = await getAnimal(obj, userStr);
  populateAnimalStats(animal.msg, userStr);
});

async function getAnimal(creds, user) {
  const url = window.location.href.split('/');
  const animal = url[url.length - 1];

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

function populateAnimalStats(animal, user) {
  console.log('populate')
  console.log(animal)
  console.log(user)
  // todo these are here for demoing, will need to be added to the db
  // const type = 'bird';
  // const state = 'bored'
  // const display = `<li class="waves-effect" id="${animal.name}" data-animal="${animal.uuid}" style="padding-bottom: 5px;">
  //     <div class="valign-wrapper">
  //         <img 
  //         src="/assets/concept-art/${type}-tamagotchi/img/${type}_${state}.png"
  //         style="max-width:80px; height: 80px;border-radius:50%;"
  //         / >
  //         <div class="title">
  //             ${animal.name}<br>
  //             <span>${animal.createdAt}</span>
  //         </div>
  //         <i class="material-icons ml-auto"><i class="${'fas fa-poop'}"></i></i>
  //     </div>
  //   </li>`;

  // $('#animal').append(display);
}

// todo might not need this one
function validateInputs(obj) {
  const inputs = Object.entries(obj).filter(([key, val]) => val.length === 0);

  if (inputs.length > 0) {
    const required = inputs.map(([key, val]) => `${key}: is required.`);
    return required;
  }

  return true;
}
// data from url, username & animal name
// data from local storage usuer uuid
// call db for current animal status
// push status to view
// 