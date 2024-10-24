## Assignment 1 

## Test Case Results

The solution has successfully passed all test cases. Below are the details:

1. An Express instance should be exported from the `app.js` file using the default export syntax.

2. The GET request with path `/players/` should return the list of all the players in the team as a response.

3. The GET request with path `/players/:playerId/` should return the details of a particular player in the team as a response.

4. The POST request with path `/players/` should return the "Player Added to Team" text as a response to the success of the request.

5. The database should be updated on the POST request.

6. The PUT request with path `/players/:playerId/` should return "Player Details Updated" text as a response to the success of the request.

7. The database should be updated on the PUT request.

8. The DELETE request with path `/players/:playerId/` should return "Player Removed" text as a response to the success of the request.

9. The database should be updated on the DELETE request.


## Problem Statment
# Cricket Team

Given two files `app.js` and a database file `cricketTeam.db` consisting a table `cricket_team`.

Write APIs to perform operations on the table `cricket_team` containing the following columns,

| Columns       | Type    |
| ------------- | ------- |
| player_id     | INTEGER |
| player_name   | TEXT    |
| jersey_number | INTEGER |
| role          | TEXT    |

### API 1

#### Path: `/players/`

#### Method: `GET`

#### Description:

Returns a list of all players in the team

#### Response

```
[
  {
    playerId: 1,
    playerName: "Lakshman",
    jerseyNumber: 5,
    role: "All-rounder"
  },

  ...
]
```

### API 2

#### Path: `/players/`

#### Method: `POST`

#### Description:

Creates a new player in the team (database). `player_id` is auto-incremented

#### Request

```
{
  "playerName": "Vishal",
  "jerseyNumber": 17,
  "role": "Bowler"
}
```

#### Response

```
Player Added to Team
```

### API 3

#### Path: `/players/:playerId/`

#### Method: `GET`

#### Description:

Returns a player based on a player ID

#### Response

```
{
  playerId: 1,
  playerName: "Lakshman",
  jerseyNumber: 5,
  role: "All-rounder"
}
```

### API 4

#### Path: `/players/:playerId/`

#### Method: `PUT`

#### Description:

Updates the details of a player in the team (database) based on the player ID

#### Request

```
{
  "playerName": "Maneesh",
  "jerseyNumber": 54,
  "role": "All-rounder"
}
```

#### Response

```
Player Details Updated

```

### API 5

#### Path: `/players/:playerId/`

#### Method: `DELETE`

#### Description:

Deletes a player from the team (database) based on the player ID

#### Response

```
Player Removed
```

<br/>


