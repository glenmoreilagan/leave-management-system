const redirectLogin = () => {
  const UserToken = JSON.parse(localStorage.getItem('UserToken'))

  if(!UserToken) {
    window.location.href = '/'
  }
}

export default redirectLogin