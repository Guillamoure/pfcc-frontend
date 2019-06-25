# CharacterFinder - Pathfinder TTRPG Database & Character Creator

## Installation

This is React/frontend half of the code. For the Rails/backend of the code, go to https://github.com/Guillamoure/pfcc-backend. Clone or Download this file and copy into a new file on your terminal using

### `git clone`


Open up the file, and run

### `npm install`

followed by

### `npm start`

NOTE: the Rails server runs through localhost:3000, so make sure this React file does not run on that server. Either run the Rails server first, and let the React server go to the alternate port of 3001, or before starting this server, run

### `export PORT=3001`

before starting the server up.


## Description

This program is to help users who play the Pathfinder Role Playing Game create their characters, and have a resource where all of their character's information, abilities, features, and statistics are all in one location, on one page. This application allows a user to preview different character options, and create a character through this application.

A user, if they have administrative access, will be able to add character options and details to the backend using forms present within the application.





## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/ge
