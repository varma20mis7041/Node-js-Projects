# Test Case Results

The solution has successfully passed all test cases. Below are the details:

- **Express Instance Export**: An Express instance should be exported from the `app.js` file using the default export syntax.

- **GET /states/**: The GET request with path `/states/` should return the list of all states in the `state` table as a response.

- **GET /states/:stateId/**: The GET request with path `/states/:stateId/` should return the details of a specific state in the `state` table as a response.

- **GET /districts/:districtId/**: The GET request with path `/districts/:districtId/` should return the details of a specific district in the `district` table as a response.

- **GET /states/:stateId/stats/**: The GET request with path `/states/:stateId/stats/` should return the statistics of a specific state as a response.

- **GET /districts/:districtId/details/**: The GET request with path `/districts/:districtId/details/` should return the state name of a specific district as a response.

- **POST /districts/**: The POST request with path `/districts/` should return "District Successfully Added" text as a response to the success of the request.

- **Database Update (POST)**: The database should be updated on the POST request.

- **PUT /districts/:districtId/**: The PUT request with path `/districts/:districtId/` should return "District Details Updated" text as a response to the success of the request.

- **Database Update (PUT)**: The database should be updated on the PUT request.

- **DELETE /districts/:districtId/**: The DELETE request with path `/districts/:districtId/` should return "District Removed" text as a response to the success of the request.

- **Database Update (DELETE)**: The database should be updated on the DELETE request.
