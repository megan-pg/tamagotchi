const passMatch = (pw1, pw2) => {
  if (pw1.localeCompare(pw2) === 0) {
    return true;
  }
  return false;
};

const emailIsEmail = (str) => {
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(str)) {
    return true;
  }
  return false;
};

const validateInputs = (obj) => {
  const inputs = Object.entries(obj).filter(([key, val]) => val === undefined || val.length === 0);

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
};

const getClientCreds = () => {
  const obj = {
    token: JSON.parse(localStorage.getItem('accessToken')),
    uuid: JSON.parse(localStorage.getItem('uuid')),
    username: JSON.parse(localStorage.getItem('username')),
  };

  return obj;
};

$('#create').on('click', () => {
  const obj = {
    username: $('#username').val(),
    email: $('#email').val(),
    password: $('#passwordOne').val(),
    'password confirmation': $('#passwordTwo').val(),
  };
  const valid = validateInputs(obj);

  if (valid === 'password') {
    M.toast({ html: 'Passwords do not match.' });
  } else if (valid === 'email') {
    M.toast({ html: 'Not a valid email.' });
  } else if (Array.isArray(valid)) {
    valid.map((item) => M.toast({ html: item }));
  } else {
    delete obj['password confirmation'];
    $.post('/api/users/create', obj, (result) => {
      if (result.status === 201) {
        $('#email').val(''); // clear useless inputs
        $('#passwordTwo').val('');
        window.location.assign('/login'); // navigate to the login screen
      } else {
        M.toast({ html: result.msg });
      }
    });
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
