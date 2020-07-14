const getClientCreds = () => {
  const obj = {
    token: JSON.parse(localStorage.getItem('accessToken')),
    uuid: JSON.parse(localStorage.getItem('uuid')),
    username: JSON.parse(localStorage.getItem('username')),
  };

  return obj;
};

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
  $('.sidenav').sidenav({ edge: 'right' });
});
