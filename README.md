# Node.js MCQ Practice

Webapp for online MCQ test practicing. Tech stack used in this project are:

* Frontend
  
  * [React js](https://reactjs.org) - JavaScript library for building user interfaces
  * [Redux](https://redux.js.org) - Predictable state container for JavaScript apps.
  * [Material-ui](material-ui.com) - React UI components

* Backend

  * [Node.js](https://nodejs.org/en/) - JavaScript runtime built on Chrome's V8 JavaScript engine.
  * [Express.js](http://expressjs.com/) - web framework for Node.js
  * [Mongo DB](https://www.mongodb.com/) - NoQ Database
  * [Passport.js](passportjs.org) - Authentication middleware for Node.js


# How to contribute or run this project locally ?

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
  "GOOGLE_CLIENT_ID": "google_client_id",
  "GOOGLE_CLIENT_SECRET": "google_client_secret"
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
  open `http://localhost:3000`