### game rules
1. The game has 2 players, playing in rounds
2. In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
3. BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
4. The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
5. The first player to reach 20 points on GLOBAL score wins the game



### note
1. use an array `score` to store scores, `activePlayer` = 0 or 1 so as to access the score by index

2. generate random number between [1,6]
dice= `Math.floor(Math.random()*6)+1` => [1,6]
3. querySelector

* set the plain text of selected element
`document.querySelector('#current-'+activePlayer).textContent`

* set the HTML: a string is required

`document.querySelector('#current-'+activePlayer).innerHTML='<em>'+dice+'<em>'`

* change the css -- avoid frequently edit the style property, instead use class 
`document.querySelector('.dice').style.display='none'`

4. 
```
funtion btn(){};
document.querySelector('.btn-roll').addEventListener('click',btn)

//anonymous function
document.querySelector('.btn-roll').addEventListener('click',function(){})
```

5. save the image with the name from dice-1 to dice-6, and change them based on the random number
`dicDOM.src='dice'+dice+'.png';`

6. set all numbers to 0 at beginning
` document.getElementById('score-0').textContent=0`;

getElementById is faster than querySelector


7. update the round score
`document.querySelector('#current-'+activePlayer).textContent`

8. toggle the active player
`activePlayer===0 ? activePlayer=1 : activePlayer=0`

`document.querySelector('.player-0-panel').classList.toggle('active)`


9. hold the round score
`scores[activePlayer]+=roundScore;`


10. use funtion to apply DRY -- **toggle the player** code is the same when rolling 1 and press hold button

11.  check if the activePlayer wins the game `scores[activePlayer]>=20`, hide the dice, add winner class, remove active class


12. init() to initialize the game

`document.querySelector('.player-0-panel').classList.remove('active)` you can use remove() even there is no `active` class

13. `gamePlaying` is a state variable -- set to false after one player wins, then you click Roll Dice button, nothing happens, unless you click New Game.

### event and event listener
1. event: notification that is sent to notify the code that something happened on the webpage: click a button, scroll the window

https://developer.mozilla.org/en-US/docs/Web/Events


2. event listener: a function that performs an action based on a certain event. It waits for a specific event to happen. Event listener will call the callback funtion for us.

3. Events happen in the browser are put in **Message Queue**. When the execution stack is empty, the attached event listener will be called and get it own execution context.


<img src="https://github.com/zhaaaa7/javascript/blob/master/project/dice/event.png" width="700px" alt="how event listener work">

### state variable: 
1. the condition of the system
