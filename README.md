# CharacterFinder - Pathfinder TTRPG Database & Character Creator

This program is to help users who play the Pathfinder Role Playing Game create and manage their characters, and have a resource where all of their character's information, abilities, features, and statistics are all in one location, on one page. This application allows a user to preview different character options, and create a character through this application.

A user, if they have administrative access, will be able to add character options and details to the backend using forms present within the application.

## [Video Demo](https://youtu.be/0fllOlI-XsM)

[![Alt text](https://img.youtube.com/vi/0fllOlI-XsM/0.jpg)](https://www.youtube.com/watch?v=0fllOlI-XsM)

## Installation

This is React/frontend half of the code. For the Rails/backend of the code, go to https://github.com/Guillamoure/pfcc-backend. Clone or Download this file and copy into a new file on your terminal using


### `git clone`


Open up the file, and run

### `npm install`

followed by

### `npm start`

**Note:** the Rails server runs through localhost:3000, so make sure this React file does not run on that server. Either run the Rails server first, and let the React server go to the alternate port of 3001, or before starting this server, run

### `export PORT=3001`

before starting the server up.


**Note for Testing Purposes**
The url for connecting to the backend is saved to a variable in the `src/localhost.js` file, and is using [ngrok](https://ngrok.com/). Update `src/localhost.js` to use the localhost route.
