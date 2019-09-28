# Node.js MCQ Practice

Webapp for online MCQ test practicing. Tech stack used in this project are:

* Frontend
  
  * [React js](https://reactjs.org) - JavaScript library for building user interfaces
  * [Redux](https://redux.js.org) - Predictable state container for JavaScript apps.
  * [Material-ui](material-ui.com) - React UI components

* Backend

  * [Node.js](https://nodejs.org/en/) - JavaScript runtime built on Chrome's V8 JavaScript engine.
  * [Express.js](http://expressjs.com/) - web framework for Node.js
  * [Mongo DB](https://www.mongodb.com/) - NoSQL Database
  * [Passport.js](passportjs.org) - Authentication middleware for Node.js


## Features

* User can sign in or sign up with email and password or with Google account.

* From the dashboard, user can attend question, personilsed according to the CAT (Computerised Adaptive Test).

* On the completion of the test, user can preview their report

  * Percentage of the test
  * Attended Questoin with correct and incorrect answers filtered.
  * On the basis of the test, suggestion for improvments are generated.

#### TODO's

> Features in the future updates :

  - ~~Implement Google Oauth using json web token~~
  - ~~Implement Timer for the Test~~
  - User can download a PDF file of the attended question from the report dashboard ([using `@react-pdf/renderer` library](https://www.npmjs.com/package/@react-pdf/renderer#web-render-in-dom))
  - A personilised Dashboard for the user with past test results
  - Better Algorithm for weightage mark calculation.

## How to contribute or run this project locally ?

### Setup this repo
```
  git clone https://github.com/sanoofp/nodejs-mcq.git
  cd nodejs-mcq
```

### Configure

* Create config file at `config/default.json` ([For reference, view config npm package](https://www.npmjs.com/package/config))
* Enter required configuration details
  
  ```javascript
  {
    "JWT_SECRET": "json_web_token_secret",
    "MONGO_URI": "mongo_uri",
  }
  ```

* install dependencies
  > Note: This project uses [yarn](https://yarnpkg.com/)
  
  ```cmd 
    yarn install 
    yarn client-install
  ```

* run the app
  
  ```cmd
    yarn dev
  ```
  
* open `http://localhost:3000`