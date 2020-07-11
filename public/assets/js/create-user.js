function passMatch(pw1, pw2) {
  if (pw1.localeCompare(pw2) === 0) {
    return true;
  }
  return false;
}

function emailIsEmail(str) {
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(str)) {
    return true;
  }
  return false;
}

function validateInputs(obj) {
  const inputs = Object.entries(obj).filter(([key, val]) => val.length === 0);

  if (inputs.length > 0) {
    const required = inputs.map(([key, val]) => `${key}: is required.`);
    return required;
  }
  if (!passMatch(obj.password, obj['password confirmation'])) {
    return 'password';
  }
  if (!emailIsEmail(obj.email)) {
    return 'email';
  }
  return true;
}

function getClientCreds() {
  const obj = {
    token: JSON.parse(localStorage.getItem('accessToken')),
    uuid: JSON.parse(localStorage.getItem('uuid')),
    username: JSON.parse(localStorage.getItem('username')),
  };

  return obj;
}

$('#create').on('click', () => {
  const obj = {
    username: $('#username').val(),
    email: $('#email').val(),
    password: $('#passwordOne').val(),
    'password confirmation': $('#passwordTwo').val(),
  };
  const valid = validateInputs(obj);

  // todo create a toast or some on screen notification for the following console.logs

  if (valid === 'password') {
    console.log('Passwords do not match.');
  } else if (valid === 'email') {
    console.log('Not a valid email.');
  } else if (Array.isArray(valid)) {
    valid.map((item) => console.log(item));
  } else {
    delete obj['password confirmation'];
    $.post('/api/users/create', obj, (result) => {
      if (result.status === 201) {
        $('#email').val(''); // clear useless inputs
        $('#passwordTwo').val('');
        window.location.assign('/login'); // navigate to the login screen
      } else {
        // todo toast explaining what went wrong
        console.log(result);
      }
    });
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
      // todo add logout successufl toast
      console.log(result);
    })
    .then(() => {
      window.location.assign('/');
    })
    .fail((result) => {
      // todo add a toast here
      console.log(result);
    });
});
