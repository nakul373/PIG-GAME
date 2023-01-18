'use strict';

//  dom elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

//img svg dom el
const diceEl = document.querySelector('.dice');
//dom buttens
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

//function for generating random numbers btn 1 & 6
const randomNum = () => Math.trunc(Math.random() * 6) + 1;

let currentScore, activePlayer, playing, scores;

//starting conditions
const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  diceEl.classList.add('hidden');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('active--player');
  player1El.classList.remove('active--player');
};
init();

//switch function
const switchPlayer = function () {
  //reset current score to 0 if doce is 1
  document.querySelector(`#current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  //switching to new  player by switching 1 nd 0
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

//roling dice button functionality
btnRoll.addEventListener('click', function () {
  if (playing) {
    // 1.generating a random dice roll using custom function
    const dice = randomNum();
    console.log(dice);

    // 2.display dice image
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    // 3. check for roll 1
    if (dice !== 1) {
      // add to current score
      currentScore += dice;
      document.querySelector(`#current--${activePlayer}`).textContent =
        currentScore;
    } else {
      // switch to next player
      switchPlayer();
    }
  }
});

//hold button functionality
btnHold.addEventListener('click', function () {
  if (playing) {
    //adding score to active player from current score
    scores[activePlayer] += currentScore;

    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    if (scores[activePlayer] >= 10) {
      playing = false;
      diceEl.classList.remove('hidden');
      //if active player wins screen turns black

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      //removes aplayer active class
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      switchPlayer();
    }
  }
});

//new game button functionality
btnNew.addEventListener('click', init);
