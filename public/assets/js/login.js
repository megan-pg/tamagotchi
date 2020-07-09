function validateInputs(obj) {
  const inputs = Object.entries(obj).filter(([key, val]) => val.length === 0);

  if (inputs.length > 0) {
    const required = inputs.map(([key, val]) => `${key}: is required.`);
    return required;
  }

  return true;
}

$('#login').on('click', () => {
  const obj = {
    username: $('#username').val(),
    password: $('#passwordOne').val(),
  };
  const valid = validateInputs(obj);

  // todo create a toast or some on screen notification for the following console.logs

  if (Array.isArray(valid)) {
    valid.map((item) => console.log(item));
  } else {
    $.post('/api/users/login', obj, (result) => {
      if (result.status === 200) {
        // todo might need to check that if token already exists to update it
        localStorage.setItem('username', JSON.stringify(result.username));
        localStorage.setItem('accessToken', JSON.stringify(result.accessToken));
        localStorage.setItem('uuid', JSON.stringify(result.uuid));
        window.location.assign('/list'); // navigate to the login screen
      } else if (result.status === 404) {
        // todo toast explaining what went wrong
        console.log('User does not exist!');
      } else {
        // todo toast explaining what went wrong
        console.log(result);
      }
    });
  }
});
