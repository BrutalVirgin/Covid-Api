# COVID API

## Install

Run `npm start` to launch the server

---

## API

#### Sign up

#### `GET localhost:3000/covid/:state`

Get information for a specific state, where the state is a two-letter initial, for example: `AZ, NY` etc

---

#### `GET localhost:3000/covid/state/:id`

Get information by request id. ID can be taken from the previous request that comes in response

---

#### `GET localhost:3000/covid/show/list`

Get a list of all your requests. Pagination has been implemented in the request, the standard page size is 5 records. When navigating between pages, the page parameter should be added to the query string:

`localhost:3000/covid/show/list?page=2`
