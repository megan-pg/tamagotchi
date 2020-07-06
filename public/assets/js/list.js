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
      console.log(result.msg);
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
  animals.forEach((animal) => {
    const display = `<li class="waves-effect" id="${animal.name}" data-animal="${animal.uuid}">
      <div class="valign-wrapper">
          <img 
          src="/assets/sprite-sheet/raw-sprites/${'bird-tamagotchi/img/bird_default_1.png'}"
          style="max-width:100px; border-radius:50%;"
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
