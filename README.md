# CashGraph

[![CircleCI](https://circleci.com/gh/RyanGouldsmith/CashGraph/tree/master.svg?style=svg)](https://circleci.com/gh/RyanGouldsmith/CashGraph/tree/master)

🌍A GraphQL implementation of spending 📈

## Application Structure

The structure of the repo contains both the front-end code, and the back-end server code.

### GraphQL Server

The server directory contains an express server using `apollo` to serve `GraphQL` queries.

The schemas the application supports are in the schemas directory currently the supported schemas are:

1. `Spending` This is the contains the ability to identify all the spending items for a user and what is contained in a spending item.
2. `Tag` - Used to classify a specific spending item.
3. `User` - Used to map the user.

The resolvers directory contains all the resolver functions for queries coming in via express. They collate the information and return it back in the request.

#### Getting up and running

MongoDB will be needed to interact with the application. You will need to create two collections `spending` and `user`.

Go into the server directory and run `npm run install` followed by a `HOSTNAME=<DBHOSTNAME> PORT=<DBPORT> DB=<DBNAME> npm run start`. This will run a `nodemon` so any changes will be automatically detected.

---

### Front-end

The front-end application is a `React` application, using `Webpack` and `Apollo-client`. It is also written in `TypeScript`.

All components are withing the `src/components` directory. Inside here also contains any component tests, graphql queries and types.

#### Starting the application

Go to the client directory, run `npm run install` followed by a `TEST_USER=<USERID> npm run start`

Currently the UserID is the ObjectId from the Mongo Record in the Mongo Collection `user`

To run any tests, run `npm run test`. The testing tools used is the `react-testing-library` with `Jest`
