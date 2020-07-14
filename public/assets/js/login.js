const validateInputs = (obj) => {
  const inputs = Object.entries(obj).filter(([key, val]) => val === undefined || val.length === 0);

  if (inputs.length > 0) {
    const required = inputs.map(([key, val]) => `${key}: is required.`);
    return required;
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

$('#loginBtn').on('click', () => {
  const obj = {
    username: $('#username').val(),
    password: $('#passwordOne').val(),
  };
  const valid = validateInputs(obj);

  if (Array.isArray(valid)) {
    valid.map((item) => M.toast({ html: item }));
  } else {
    $.post('/api/users/login', obj, (result) => {
      if (result.status === 200) {
        // todo might need to check that if token already exists to update it
        localStorage.setItem('username', JSON.stringify(result.username));
        localStorage.setItem('accessToken', JSON.stringify(result.accessToken));
        localStorage.setItem('uuid', JSON.stringify(result.uuid));
        $('#username').val(''),
        $('#passwordOne').val(''),
        window.location.assign('/list'); // navigate to the login screen
      } else if (result.status === 404) {
        M.toast({ html: 'User does not exist!' });
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
