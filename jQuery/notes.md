1. 
```javascript
const login = document.getElementById('login');
const loginMenu = document.getElementById('loginMenu');

login.addEventListener('click', () => {
  if(loginMenu.style.display === 'none'){
    loginMenu.style.display = 'inline';
  } else {
    loginMenu.style.display = 'none';
  }
});
```
The code below accomplishes the same behavior with jQuery:
```javascript
$('#login').click(() => {
  $('#loginMenu').toggle()
});
```
