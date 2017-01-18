Lab-11 & 12 REST API using Express
===
Server-side routing handled by Express.js

## Description
A REST API for games on an HTTP server that users can make POST, GET, PUT, and DELETE requests to with appropriate routes and responses. This lab differs from Lab-08 & 09 in that Express handles basic router construction and parsing the JSON body into a workable object for PUT and POST requests.
##### Modules
- **server.js** -- starts the server and creates an instance of a router for the games API
- **game.js** -- item constructor that assigns a unique id to each game and takes user input data for:
  - title *required for POST*
  - genre *required for POST*
  - developer *required for POST*
  - publisher
  - platforms
  - ESRB rating
  - release date
- **storage.js** -- storage for item data; stores each item by item type and id
-**game-router.js** -- creates routes for doing create, read, and delete operations on items

## Usage
- On the command line, type `node server.js` and the server will be up on port 3000 unless you specify otherwise in a `.env` file.
  - If you wish to use a different port, create a new file in the directory named `.env` and on the first line type `PORT=2000` or whatever port you choose. Then use that port in place of `3000` in the below steps.
- To add a new game to the API, type in a POST request, filling the empty quotes with your data:
  - `http POST :3000/api/games title="" genre="" developer="" publisher="" platforms="" ratingESRB="" releaseDate=""`
  - The server will respond with a `200 OK` status and return the new item data. Note the unique ID.
  - If you get `400 Bad Request` that means you didn't fill out all the properties.
- To get an array of all the game IDs currently in the data directory, make a GET request without an ID query:
  - `http GET :3000/api/games`
  - `200 OK` -- successful request
- To read a game that exists in the API, make a GET request with the game's unique ID:
  - *use the id from the POST request's response*
  - `http GET :3000/api/games?id=*id here*`
  - `200 OK` -- successful request
  - `400 Bad Request` -- you forgot to add the unique ID
  - `404 Not Found` -- the game with the ID you supplied does not exist in the API's storage
- To delete a game from the API, make a DELETE request with the game's unique ID:
  - `http DELETE ::3000/api/games?id=*id here*`
  - `204 No Content` -- the game data has been successfully removed
  - `400 Bad Request` -- you forgot to add the unique ID
  - `404 Not Found` -- the game with the ID you supplied already does not exist in the API's storage
