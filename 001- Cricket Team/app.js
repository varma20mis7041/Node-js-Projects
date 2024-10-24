const express = require("express");
const app = express();
app.use(express.json());
const { open } = require("sqlite");

const path = require("path");
const dbPath = path.join(__dirname, "cricketTeam.db");

let db = null;

const sqlite3 = require("sqlite3");
const setup = async () => {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    });
    app.listen(3002, () => {
      console.log("server started");
    });
  } catch (error) {
    console.log(`db error ${error}`);
    process.exit(1);
  }
};

// Helper function to modify the player list
const modifyList = (currentList) => {
  const updatedList = currentList.map((eachItem) => {
    return {
      playerId: eachItem.player_id,
      playerName: eachItem.player_name,
      jerseyNumber: eachItem.jersey_number,
      role: eachItem.role,
    };
  });
  return updatedList;
};

// API 1: Get all players in the cricket team
app.get("/players/", async (request, response) => {
  const getPlayersQ = `
    SELECT * FROM cricket_team;
  `;
  const getPlayersResponse = await db.all(getPlayersQ);
  const updatedResponse = modifyList(getPlayersResponse);
  console.log(updatedResponse);
  response.send(updatedResponse);
});

// API 2: Add a new player to the cricket team
app.post("/players/", async (request, response) => {
  const playerDetails = request.body;
  console.log("player details", playerDetails);
  const { playerName, jerseyNumber, role } = playerDetails;
  const addPlayerQ = `
    INSERT INTO cricket_team
      (player_name, jersey_number, role)
    VALUES 
      ('${playerName}', ${jerseyNumber}, '${role}');
  `;
  const addNewPlayerResponse = await db.run(addPlayerQ);
  response.send("Player Added to Team");
});

// API 3: Get a single player by player ID
app.get("/players/:playerid/", async (request, response) => {
  const { playerid } = request.params;
  const getSinglePlayer = `
    SELECT * FROM cricket_team WHERE player_id = ${playerid};
  `;
  const getSinglePlayerResponse = await db.get(getSinglePlayer);
  const selectedPlayer = modifyList([getSinglePlayerResponse]);
  response.send(selectedPlayer[0]);
});

// API 4: Update player details by player ID
app.put("/players/:playerid/", async (request, response) => {
  const playerDetails = request.body;
  const { playerName, jerseyNumber, role } = playerDetails;
  const { playerid } = request.params;
  console.log(playerDetails, playerid);
  const updatePlayer = `
    UPDATE cricket_team SET 
      player_name = '${playerName}',
      jersey_number = ${jerseyNumber},
      role = '${role}'
    WHERE player_id = ${playerid};
  `;
  const updatePlayerDetails = await db.run(updatePlayer);
  response.send("Player Details Updated");
});

// API 5: Delete a player from the cricket team by player ID
app.delete("/players/:playerid/", async (request, response) => {
  const { playerid } = request.params;
  const deletePlayer = `
    DELETE FROM cricket_team WHERE player_id = ${playerid};
  `;
  const deletePlayerResponse = await db.run(deletePlayer);
  response.send("Player Removed");
});

// Initialize database and server
setup();

module.exports = app;
