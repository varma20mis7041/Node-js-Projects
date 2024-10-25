### Test Case Results
The solution has successfully passed all test cases. Below are the details:

- **Express Instance Export**: An Express instance should be exported from the `app.js` file using the default export syntax.

- **GET /movies/**: The GET request with path `/movies/` should return the list of all movie names in the movies database as a response.

- **GET /movies/:movieId/**: The GET request with path `/movies/:movieId/` should return the details of a specific movie in the movies database as a response.

- **POST /movies/**: The POST request with path `/movies/` should return "Movie Successfully Added" text as a response to the success of the request.

- **Database Update (POST)**: The database should be updated on the POST request.

- **PUT /movies/:movieId/**: The PUT request with path `/movies/:movieId/` should return "Movie Details Updated" text as a response to the success of the request.

- **Database Update (PUT)**: The database should be updated on the PUT request.

- **DELETE /movies/:movieId/**: The DELETE request with path `/movies/:movieId/` should return "Movie Removed" text as a response to the success of the request.

- **Database Update (DELETE)**: The database should be updated on the DELETE request.

- **GET /directors/**: The GET request with path `/directors/` should return the list of all the directors in the movies database as a response.

- **GET /directors/:directorId/movies/**: The GET request with path `/directors/:directorId/movies/` should return the list of all movie names directed by a specific director as a response to the success of the request.


# Assignment Instructions
## Movies

Given two files `app.js` and a database file `moviesData.db` consisting of two tables `movie` and `director`.

Write APIs to perform CRUD operations on the tables `movie`, `director` containing the following columns,

**Movie Table**

| Columns     | Type    |
| ----------- | ------- |
| movie_id    | INTEGER |
| director_id | INTEGER |
| movie_name  | TEXT    |
| lead_actor  | TEXT    |

**Director Table**

| Columns       | Type    |
| ------------- | ------- |
| director_id   | INTEGER |
| director_name | TEXT    |

### API 1

#### Path: `/movies/`

#### Method: `GET`

#### Description:

Returns a list of all movie names in the movie table

#### Response

```
[
  {
    movieName: "Captain America: The First Avenger",
  },

  ...
]
```

### API 2

#### Path: `/movies/`

#### Method: `POST`

#### Description:

Creates a new movie in the movie table. `movie_id` is auto-incremented

#### Request

```
{
  "directorId": 6,
  "movieName": "Jurassic Park",
  "leadActor": "Jeff Goldblum"
}
```

#### Response

```
Movie Successfully Added
```

### API 3

#### Path: `/movies/:movieId/`

#### Method: `GET`

#### Description:

Returns a movie based on the movie ID

#### Response

```
{
  movieId: 12,
  directorId: 3,
  movieName: "The Lord of the Rings",
  leadActor: "Elijah Wood",
}
```

### API 4

#### Path: `/movies/:movieId/`

#### Method: `PUT`

#### Description:

Updates the details of a movie in the movie table based on the movie ID

#### Request

```
{
  "directorId": 24,
  "movieName": "Thor",
  "leadActor": "Christopher Hemsworth"
}
```

#### Response

```
Movie Details Updated

```

### API 5

#### Path: `/movies/:movieId/`

#### Method: `DELETE`

#### Description:

Deletes a movie from the movie table based on the movie ID

#### Response

```
Movie Removed
```

### API 6

#### Path: `/directors/`

#### Method: `GET`

#### Description:

Returns a list of all directors in the director table

#### Response

```
[
  {
    directorId: 1,
    directorName: "Joe Johnston",
  },

  ...
]
```

### API 7

#### Path: `/directors/:directorId/movies/`

#### Method: `GET`

#### Description:

Returns a list of all movie names directed by a specific director

#### Response

```
[
  {
    movieName: "Captain Marvel",
  },

  ...
]
```

<br/>

Use `npm install` to install the packages.

**Export the express instance using the default export syntax.**

**Use Common JS module syntax.**
