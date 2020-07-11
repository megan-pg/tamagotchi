function getClientCreds() {
  const obj = {
    token: JSON.parse(localStorage.getItem('accessToken')),
    uuid: JSON.parse(localStorage.getItem('uuid')),
    username: JSON.parse(localStorage.getItem('username')),
  };

  return obj;
}

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
      M.toast({ html: 'Error.' });
      console.log(result);
    });
});
