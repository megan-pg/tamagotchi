$(() => {
  // todo add some validation here, if there's no/null values from getClientCreds
  // don't bother with the db call
  const obj = getClientCreds();
  const userStr = obj.username.slice(1, -1);

  $.ajax({
    url: `/api/users/${userStr}/animals`,
    type: 'post',
    headers: {
      authorization: obj.token,
    },
    dataType: 'json',
  })
    .then((result) => {
      populateAnimalsList(result.msg, userStr);
    })
    .fail((result) => {
      // todo add a toast here
      console.log(result);
    });
});

function getClientCreds() {
  const obj = {
    token: localStorage.getItem('accessToken'),
    uuid: localStorage.getItem('uuid'),
    username: localStorage.getItem('username'),
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

$('#addNewButton').click(() => {
  $('#addNewForm').toggleClass('active');
});
