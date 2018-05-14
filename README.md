# React-GraphQL Dashboard

## Overview

This is a simple application that contains the following functionality:
- User authentication (log-in and sign-up flows)
- Perform CRUD operations of user data
- Receive user updates in real-time
- User data updates are constrainted to user-level permissions

## Technologies

- MongoDB stores user data
- Mongoose is used to interact with MongoDB to retrieve data
- Auth0 and JWT for user authentication
- GraphQL as an API
- Apollo client for interacting with GraphQL
- Webpack as a build tool
- Material UI as a UI kit
- Jest for unit testing
- Flow-type for static-type checking

## Configuration

Create a .env file after you've checked out this repo and use this as a template:

```
MONGO_URI=mongodb://user:password@myhost/collection
PORT=4000

AUTH0_CLIENT_ID=
AUTH0_CLIENT_SECRET=
```

## Installation

To install dependencies use:

```
npm install
```

## Starting the dev server

Start the dev server by running:

```
npm run dev
```

## Running Tests

Use `jest --updateSnapshot` to update your Jest snapshots prior to testing. Then use npm test to run jest.

## Testing with Flow

Simply use `npm run flow`.
