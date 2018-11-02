# Memory Game Project

This project is a fully browser-based implementation of the well-known **Memory Game**. The user is presented with a 4 by 4 card grid. Once the user has matched all 8 pairs of cards, the game has been won.

## Table of Contents

* [Description of the Game](#description-of-the-game)
* [Getting Started](#getting-started)
* [Contributing](#contributing)

## Description of the Game

 Cards are initially shuffled, and they also face down, so that their symbol cannot be seen. There are a total of 16 cards, and 8 symbols. Each symbol appears in exactly two cards. In other words, there are 8 pairs of cards where each pair has a distinct symbol.

Each time the user makes a move, one card is turned over. Then, the user makes a second move, which turns over a second card. If there is a match, both cards remain turned over. Otherwise, they both are faced down. Once all cards are turned over, the game has been won and comes to an end.

The game also provides:

* A star rating: The user performance is measured by a number of stars, from one to five. The number of stars depends on the number of moves the user has made so far.
* A move counter: It shows the number of moves the user has made up until now.
* A timer: It shows the current duration of the game, from the time the user made their first move, up until the game finishes.
* A restart button: It allows the user to restart the game. As a result, all cards are faced down and shuffled. In addition, star rating, move counter and timer are returned to their initial values.

## Getting Started

This is a fully browser-based application, so you will only need a browser to run it. There are no external dependencies.

It is made up of a number of files:

* index.html: It contains the application's HTML code.
* css\app.css: It contains the application's CSS code.
* js\app.js: It contains the application's JavaScript code.
* img\: It contains the application's images.
* README.md: It contains the documentation file you are viewing right now. 

The application can be started by simply running the index.html file on a browser.

The application has been made with responsiveness in mind. As a result, it is fully functional across modern devices, such as desktop, tablet, and phone ones.

## Contributing

This repository contains all the code that makes up the application. Individuals and I myself are encouraged to further improve this project. As a result, I will be more than happy to consider any pull requests.

