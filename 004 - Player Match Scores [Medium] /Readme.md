# Test Case Results

The solution has successfully passed all test cases. Below are the details:

1. **Express Instance Export**  
   ◦ An Express instance should be exported from the `app.js` file using the default export syntax.

2. **GET /players/**  
   ◦ The GET request with path `/players/` should return the list of all players in the `player_details` table as a response.

3. **GET /players/:playerId/**  
   ◦ The GET request with path `/players/:playerId/` should return the details of a specific player in the `player_details` table as a response.

4. **PUT /players/:playerId/**  
   ◦ The PUT request with path `/players/:playerId/` should return "Player Details Updated" text as a response upon success.

5. **Database Update (PUT)**  
   ◦ The database should be updated on the PUT request.

6. **GET /matches/:matchId/**  
   ◦ The GET request with path `/matches/:matchId/` should return the details of a specific match in the `match_details` table as a response.

7. **GET /players/:playerId/matches**  
   ◦ The GET request with path `/players/:playerId/matches` should return the list of all matches associated with a player as a response.

8. **GET /matches/:matchId/players**  
   ◦ The GET request with path `/matches/:matchId/players` should return the list of all players in a match as a response.

9. **GET /players/:playerId/playerScores**  
   ◦ The GET request with path `/players/:playerId/playerScores` should return the player details along with the total score, number of fours, and sixes of a player as a response.


# Assignment instructions given to me
## Player Match Scores

Given two files `app.js` and a database file `cricketMatchDetails.db` consisting of three tables `player_details`, `match_details` and `player_match_score`.

Write APIs to perform operations on the tables `player_details`, `match_details` and `player_match_score` containing the following columns,

**Player Details Table**

| Column    | Type    |
| ---------- | ------- |
| player_id   | INTEGER |
| player_name | TEXT    |

**Match Details Table**

| Column    | Type    |
| ---------- | ------- |
| match_id   | INTEGER |
| match | TEXT    |
|year|INTEGER|

**Player Match Score Table**

| Column    | Type    |
| ---------- | ------- |
| player_match_id   | INTEGER |
| player_id | INTEGER    |
|match_id|INTEGER|
|score|INTEGER|
|fours | INTEGER |
|sixes | INTEGER |

### API 1

#### Path: `/players/`

#### Method: `GET`

#### Description:

Returns a list of all the players in the player table

#### Response

```
[
  { 
    playerId: 1,
    playerName: "Ram"
  },

  ...
]
```

### API 2

#### Path: `/players/:playerId/`

#### Method: `GET`

#### Description:

Returns a specific player based on the player ID

#### Response

```
{ 
  playerId: 2,
  playerName: "Joseph"
}
```

### API 3

#### Path: `/players/:playerId/`

#### Method: `PUT`

#### Description:

Updates the details of a specific player based on the player ID

#### Request

```
{
  "playerName": "Raju"
}
```

#### Response

```
Player Details Updated
```



### API 4

#### Path: `/matches/:matchId/`

#### Method: `GET`

#### Description:

Returns the match details of a specific match

#### Response

```
{ 
  matchId: 18,
  match: "RR vs SRH",
  year: 2011
}
```

### API 5

#### Path: `/players/:playerId/matches`

#### Method: `GET`

#### Description:

Returns a list of all the matches of a player

#### Response

```
[
  { 
    matchId: 1,
    match: "SRH vs MI",
    year: 2016
  },

  ...
]
```


### API 6

#### Path: `/matches/:matchId/players`

#### Method: `GET`

#### Description:

Returns a list of players of a specific match

#### Response

```
[
  { 
    playerId: 2,
    playerName: "Joseph"
  },
  ...
]
```



### API 7

#### Path: `/players/:playerId/playerScores`

#### Method: `GET`

#### Description:

Returns the statistics of the total score, fours, sixes of a specific player based on the player ID

#### Response

```
{
  playerId: 1,
  playerName: "Ram"
  totalScore: 3453,
  totalFours: 342,
  totalSixes: 98
}

```

<br/>

Use `npm install` to install the packages.

**Export the express instance using the default export syntax.**

**Use Common JS module syntax.**
