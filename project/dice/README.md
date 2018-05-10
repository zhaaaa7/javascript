### game rules
1. The game has 2 players, playing in rounds
2. In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
3. BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
4. The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
5. The first player to reach 20 points on GLOBAL score wins the game



### note
1. use an array `score` to store scores, `activePlayer` to access the score by index

2. generate random number between [1,6]
dice= `Math.floor(Math.random()*6)+1` => [1,6]
3. set the plain text of selected element
`document.querySelector('#current-'+activePlayer).textContent`

set the HTML: a string is required
`document.querySelector('#current-'+activePlayer).innerHTML='<em>'+dice+'<em>'`

change the css
`document.querySelector('.dice').style.display='none'`
