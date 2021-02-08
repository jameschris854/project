'use strict';

// Selecting elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');


const diceEl = document.querySelector('.dice');
const diceE2 = document.querySelector('.dice2');


const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let scores, currentScore, activePlayer, playing;
var diceCount = 1;

// Starting conditions
const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  diceEl.style.display = 'none';
  diceE2.style.display = 'none';

  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
};
init();

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  diceCount = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;

  diceEl.style.display = 'none';
  diceE2.style.display = 'none';

  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

// Rolling dice functionality
btnRoll.addEventListener('click', function () {
  if (playing) {
    // 1. Generating a random dice roll Math.trunc(Math.random() * 6) + 1;
    const dice1 = Math.trunc(Math.random() * 6) + 1;
    const dice2 = Math.trunc(Math.random() * 6) + 1;
    console.log(dice1, dice2)


    // 2. Display dice
    diceEl.style.display = 'block';
    diceE2.style.display = 'block';

    diceEl.src = `/images/dice-${dice1}.png`;
    diceE2.src = `/images/dice-${dice2}.png`;

    // 3. Check for rolled 1
    if (dice1 !== 1 && dice1 !== 6 && dice2 !== 1 && dice2 !== 6) {
      // Add dice to current score
      currentScore += dice1 + dice2;
      document.getElementById(
        `current--${activePlayer}`
      ).textContent = currentScore;
    }
    else if (dice1 == 6 || dice2 == 6) {
      if (dice1 == 6 && dice2 == 6) {
        switchPlayer();
      }
      else if (diceCount < 2) {
        diceCount = 2;
        currentScore += dice1 + dice2;
        document.getElementById(
          `current--${activePlayer}`
        ).textContent = currentScore;
        console.log('diceCount ' + diceCount)
      }
      else {
        switchPlayer();
      }
    }
    else {
      // Switch to next player
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    // 1. Add current score to active player's score
    scores[activePlayer] += currentScore;
    // scores[1] = scores[1] + currentScore

    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    var input = document.querySelector('.Score--Editor').value;
    console.log(input)
    if (input) {
      var winningScore = input;
    } else {
      winningScore = 100
    }

    // 2. Check if player's score is >= 100
    if (scores[activePlayer] >= winningScore) {
      // Finish the game
      playing = false;
      diceEl.classList.add('hidden');

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      // Switch to the next player
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', init);
