/*** SHUFFLE: Function from http://stackoverflow.com/a/2450976
              to shuffle the cards                                  ***/

function shuffle(array) {
   	var currentIndex = array.length, temporaryValue, randomIndex;
   	while (currentIndex !== 0) {
       	randomIndex = Math.floor(Math.random() * currentIndex);
       	currentIndex -= 1;
       	temporaryValue = array[currentIndex];
       	array[currentIndex] = array[randomIndex];
       	array[randomIndex] = temporaryValue;
	}
   	return array;
}

/*** GAMESETUP: Function to initialize the game as described below. ***/

function gameSetUp() {

/*** STEP 1) Create a list that holds all cards        ***/

	let cards = ['fa-diamond','fa-diamond','fa-paper-plane-o',
	 		 'fa-paper-plane-o','fa-anchor','fa-anchor',
			 'fa-bolt','fa-bolt','fa-cube','fa-cube',
			 'fa-leaf','fa-leaf','fa-bicycle','fa-bicycle',
			 'fa-bomb','fa-bomb'];

/***  STEPS 2 TO 4) DISPLAY THE CARDS ON THE PAGE      ***/

/***  STEP 2) Shuffle the list of cards using the      ***/
/***          provided "shuffle" method above          ***/

	cards = shuffle(cards);

/*** STEP 3) Loop through each card and create its HTML***/

	let docFrag = document.createDocumentFragment();

	for (const card of cards) {
		let cardHTML1 = document.createElement('li');
		cardHTML1.classList.add('card');
		cardHTML1.classList.add('closed');
		let cardHTML2 = document.createElement('i');
		cardHTML2.classList.add('fa');
		cardHTML2.classList.add(card);
		cardHTML1.appendChild(cardHTML2);
  		docFrag.appendChild(cardHTML1);
	}

/*** STEP 4) Add each card's HTML to the page          ***/

/*** Note that for performance reasons,                ***/
/*** I hide, remove from the DOM, add to the DOM,      ***/
/*** and then show. This way, we do the job            ***/
/*** with one reflow and two repaints only!! :-)       ***/
/***                                                   ***/

/* Step 4.1) First of all, the current cards on the screen are hidden. */

	deck.classList.add('hidden');

/* Step 4.2) Secondly, the current cards on the screen are removed. */

	let currentCards = document.querySelectorAll('.card');
	for (const currentCard of currentCards) {
		deck.removeChild(currentCard);
	}

/* Step 4.3) Then, the new cards are added to the screen.            */

	deck.appendChild(docFrag);

/* Step 4.4) Finally, the new cards are shown on the screen.        */

	deck.classList.remove('hidden');

/* LAST GAMESETUP STEP) Some further initializations, which basically refer
   to the counter, the timer, the star rating, and the lists of cards. */

	moveCounter = 0;
	document.querySelector('.moves').textContent = `0 Moves`;

	timer = 0;
	hhmmss = '00:00:00';
	document.querySelector('.timer').textContent = `00:00:00`;
	intervalId = 0;

	starCounter = maxNumberOfStars;

	openCards = [];
	matchingCards = [];
    cardsDoMatch = false;
}

/*** INITSTARS: Function to initialize the number of stars to its maximum
				when the user clicks the restart button or the "Play again!"
			    button at the congratulations message.***/

function initStars() {

/* The hide/change all/show pattern is used. */

	stars.classList.add('hidden');

	for (let i = 0; i < starCounter; i++) {
		stars.firstElementChild.remove();
	}

	let docFrag = document.createDocumentFragment();

	for (let i = 0; i < maxNumberOfStars; i++) {
		starHTML1 = document.createElement('li');
		starHTML2 = document.createElement('i');
		starHTML2.classList.add('fa');
		starHTML2.classList.add('fa-star');
		starHTML1.appendChild(starHTML2);
		docFrag.appendChild(starHTML1);
	}
	stars.appendChild(docFrag);
	stars.classList.remove('hidden');
}

/* SHOWCARDSYMBOL: Function to display the card's symbol.
	The card transitions from "closed" to "open" */

function showCardSymbol() {
	eventTarget.classList.remove('closed');
	eventTarget.classList.add('open');
}

/* ADDOPENCARD: Function to add the card to a *list* of "open" cards. */

function addOpenCard() {
	openCards.push(eventTarget);
}

/* CARDSMATCH: Function to check if the two cards match. */

function cardsMatch() {
  	const [,firstCard] = openCards[0].firstElementChild.classList;
	const [,secondCard] = openCards[1].firstElementChild.classList;
	return (firstCard === secondCard) ? true : false;
}

/* LOCKCARDSOPEN: Function to lock the cards in the open position.
				  The cards transitions from "open" to "match" */

function lockCardsOpen() {
	openCards[0].classList.remove('open');
	openCards[0].classList.add('match');
    openCards[1].classList.remove('open');
    openCards[1].classList.add('match');
    matchingCards.push(openCards[0]);
    matchingCards.push(openCards[1]);
    openCards.pop();
    openCards.pop();
}

/* REMOVECARDSHIDESYMBOL: Function to remove the cards from
                          the list and hide the card's symbol */

function removeCardsHideSymbol(matchingCard) {
    openCards[0].classList.remove('open');
    openCards[0].classList.add('closed');
    openCards[1].classList.remove('open');
    openCards[1].classList.add('closed');
    openCards.pop();
    openCards.pop();
}

/* CONVERTSECONDSTOHHMMSS: Function to convert a given number of seconds to
                           the hh:mm:ss format to be shown on the screen */

function convertSecondstoHHMMSS() {
	let hh = Math.trunc(timer / 3600);
	if (hh < 10) {
		hh = `0${hh.toString()}`;
	}
	let ss = timer - (hh * 3600);
	let mm = Math.trunc(ss / 60);
	if (mm < 10) {
		mm = `0${mm.toString()}`;
	}
	ss = ss - (mm * 60);
	if (ss < 10) {
		ss = `0${ss.toString()}`;
	}
	return `${hh}:${mm}:${ss}`;
}

/* MANAGECOUNTERTIMERSTARS: Function to increment the timer by one unit */

function displayTime(){
	timer += 1;
	hhmmss = convertSecondstoHHMMSS();
	document.querySelector('.timer').textContent = `${hhmmss}`;
}

/* MANAGECOUNTERTIMERSTARS: Function to increment the move counter and display
						    it on the page. It also calls the DISPLAYTIME
						    function to show the current game duration starting
						    from the first move up until the time the user wins
						    the game or restarts it in some way. Finally, it
						    manages the number of stars shown depending on the
						    number of moves the user has already made. */

function manageCounterTimerStars() {
	/* increment counter and timer */
	moveCounter += 1;
	if (moveCounter === 1) {
		document.querySelector('.moves').textContent = `1 Move`;
		intervalId = setInterval(displayTime, timerMillisecondsUnit);
	} else {
		document.querySelector('.moves').textContent = `${moveCounter} Moves`;
	}
	/* Manage number of stars depending of number of moves already made */
	if (moveCounter >= movesFiveStars && moveCounter < movesFourStars &&
		starCounter === 5) {
		document.querySelector('.stars').firstElementChild.remove();
		starCounter = 4;
	} else {
		if (moveCounter >= movesFourStars && moveCounter < movesThreeStars &&
		    starCounter === 4) {
			document.querySelector('.stars').firstElementChild.remove();
			starCounter = 3;
		} else {
			if (moveCounter >= movesThreeStars &&
				moveCounter < movesTwoStars &&
		    	starCounter === 3) {
				document.querySelector('.stars').firstElementChild.remove();
				starCounter = 2;
			} else {
				if (moveCounter >= movesTwoStars &&
		    		starCounter === 2) {
					document.querySelector('.stars').firstElementChild.remove();
					starCounter = 1;
				}
			}
		}
	}
}
/* CHECKALLCARDSMATCHED: Function to display a message with the final score.
                         It also clears the timer function. */

function checkAllCardsMatched() {
	if (matchingCards.length === numberOfCardsMatchedtoWin) {
		clearInterval(intervalId);
		document.querySelector('.container').classList.add('win');
		document.querySelector('.container-winner').classList.add('win');
		document.querySelector('.moves-stars').textContent =
			`With ${moveCounter} Moves and ${starCounter} Stars`;
		document.querySelector('.duration').textContent =
			`and a duration of ${hhmmss}`;
	}
}

/* CLICKCARDMANAGER: Function to manage clicks on the cards */

function clickCardManager(event) {
	/* If a card is clicked */
	if (event.target.nodeName === 'LI' ||
		event.target.nodeName === 'I') {
		if (event.target.nodeName === 'LI') {
			eventTarget = event.target;
		} else {
			eventTarget = event.target.parentElement;
		}
		/* If the card is not already matched or open */
		if (eventTarget.classList.contains('match') === false &&
			eventTarget.classList.contains('open') === false) {
			/* If there are not already two cards open */
			if (openCards.length < 2) {
				/* display the card's symbol */
				showCardSymbol();
				/* add the card to a *list* of "open" cards */
				addOpenCard();
				/* if the list already has another card */
				if (openCards.length > 1) {
					/* check to see if the two cards match */
					cardsDoMatch = cardsMatch();
					if (cardsDoMatch === true) {
						/* if the cards do match, lock the cards in the open
					  	 position */
						setTimeout(lockCardsOpen,500);
					} else {
						/* if the cards do not match, remove the cards from
					   	the list and hide the card's symbol */
						setTimeout(removeCardsHideSymbol,500);
					}
				}
				/* increment the move counter and display it on the page */
				manageCounterTimerStars();
				/* if all cards have matched, display a message with
			   	   the final score */
			   	/* there is no need to check for a win if there is only
			   	   one card open or if the couple of cards being evaluated
			   	   is not the last one to be matched. */
			   	if (openCards.length === 2 &&
			   		matchingCards.length === (numberOfCardsMatchedtoWin - 2)) {
			   		/* there is no need to check for a win either if the couple
			   		   of cards being evaluated is not a match */
			   		if (cardsDoMatch === true) {
						setTimeout(checkAllCardsMatched,1000);
					}
				}
			}
    	}
	}
}

/* CLICKCARDMANAGER: Function to manage clicks on the restart button */

function clickRestartManager() {
	clearInterval(intervalId);
	initStars();
	gameSetUp();
}

/*** CLICKBUTTONMANAGER: Function to manage clicks on "Play again!" button
			 at the message that shows the user has won the game.  ***/

function clickButtonManager() {
	clearInterval(intervalId);
	document.querySelector('.container').classList.remove('win');
	document.querySelector('.container-winner').classList.remove('win');
	initStars();
	gameSetUp();
}

/*** STEP 0) General initializations                               ***/

/* General initializations for the move counter */

let moveCounter = 0;

/* General initializations for the timer */

let timer = 0;
let intervalId = 0;
const timerMillisecondsUnit = 1000;
let hhmmss = '00:00:00';

/* General initializations for the list that contains the two cards to be
   evaluated for a match, for the list that contains all cards matched up to
   now, and for the constant containing the number of cards to be matched to
   win the game. */

let openCards = [];
const numberOfCardsMatchedtoWin = 16;
let matchingCards = [];

/* General initializations for the variable that stores whether the two cards
   to be evaluated are a match or not, and for the deck element. */

let cardsDoMatch = false;
let deck = document.querySelector('.deck');

/* General initializations to track the number of stars that the user holds at
   any given time during the game. The starHTML1, starHTML2, and starHTML3
   variables are intended to manipulate the DOM for the stars. In particular,
   they add new stars when the game is initialized, so that the maximum
   number of stars is restored. */

const minNumberOfStars = 1;
const maxNumberOfStars = 5;
const movesFiveStars = 25;
const movesFourStars = 35;
const movesThreeStars = 45;
const movesTwoStars = 55;
let starHTML1 = null;
let starHTML2 = null;
let starHTML3 = null;
let starCounter = maxNumberOfStars;
let stars = document.querySelector('.stars');

/*** STEPS 1 to 4) Initialize the game (common initializations to
                   page load, game restart button, and "play
                   again!" button).                                ***/

gameSetUp();

/*** STEP 5) Set up the event listener for a card                  ***/

let eventTarget = null;
deck.addEventListener('click', clickCardManager);

/*** STEP 6) Set up the event listener for the restart button      ***/

let restart = document.querySelector('.restart');
restart.addEventListener('click', clickRestartManager);

/*** STEP 7) Set up the event listener for the button "Play again!"
			 at the congratulations message.  ***/

let button = document.querySelector('.button');
button.addEventListener('click', clickButtonManager);