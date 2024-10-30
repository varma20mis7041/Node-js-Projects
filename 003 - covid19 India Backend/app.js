const express = require("express");
const app = express();
app.use(express.json());

const { open } = require("sqlite");
const sqlite3 = require("sqlite3");

const path = require("path");
const databasePath = path.join(__dirname, "covid19IndiaPortal.db");
let db = null;

const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");

const setupAndRunServer = async () => {
  try {
    db = await open({
      filename: databasePath,
      driver: sqlite3.Database,
    });
    app.listen(3004, () => {
      console.log("server is up and running");
    });
  } catch (error) {
    console.log(error);
  }
};

const authenticate = (request, response, next) => {
  let jwtToken;
  const authHeaders = request.headers["authorization"];
  if (authHeaders !== undefined) {
    jwtToken = authHeaders.split(" ")[1];
  }
  console.log(jwtToken);
  if (jwtToken === undefined) {
    response.status(401);
    response.send("Invalid JWT Token");
  } else {
    jwt.verify(jwtToken, "bhargav", (error, payload) => {
      if (error) {
        response.status(401);
        response.send("Invalid JWT Token");
      } else {
        next();
      }
    });
  }
};

app.post("/login/", async (request, response) => {
  const userDetails = request.body;
  const { username, password } = userDetails;
  const getUserQuery = `select * from user where username = '${username}' `;
  const dbUser = await db.get(getUserQuery);
  if (dbUser === undefined) {
    response.status(400);
    response.send("Invalid user");
  } else {
    const isPasswordMatched = await bcrypt.compare(password, dbUser.password);
    if (isPasswordMatched) {
      const payload = {
        username: username,
      };
      const jwtToken = jwt.sign(payload, "bhargav");
      response.send({ jwtToken });
    } else {
      response.status(400);
      response.send("Invalid password");
    }
  }
});

// API 1: Get all states
app.get("/states/", authenticate, async (request, response) => {
  const getAllStates = `
    Select * from state;
  `;
  const states = await db.all(getAllStates);
  response.send(
    states.map((eachState) => ({
      stateId: eachState.state_id,
      stateName: eachState.state_name,
      population: eachState.population,
    }))
  );
});

// API 2: Get a state by ID
app.get("/states/:stateId/", authenticate, async (request, response) => {
  const { stateId } = request.params;
  const getSingleStateQuery = `
    Select * from state where state_id = ${stateId}
  `;
  const singleState = await db.get(getSingleStateQuery);
  response.send({
    stateId: singleState.state_id,
    stateName: singleState.state_name,
    population: singleState.population,
  });
});

// API 3: Create a new district
app.post("/districts/", authenticate, async (request, response) => {
  const districtDetails = request.body;
  const {
    districtName,
    stateId,
    cases,
    cured,
    active,
    deaths,
  } = districtDetails;
  const createDistrictQuery = `
    insert into district(
      district_name,
      state_id,
      cases,
      cured,
      active,
      deaths
    )values (
      '${districtName}',
      ${stateId},
      ${cases},
      ${cured},
      ${active},
      ${deaths}
    )
  `;
  await db.run(createDistrictQuery);
  response.send("District Successfully Added");
});

// API 4: Get a district by ID
app.get("/districts/:districtId/", authenticate, async (request, response) => {
  const { districtId } = request.params;
  const getDistrict = `
    Select * from district where district_id = ${districtId}
  `;
  const selectedDistrict = await db.get(getDistrict);
  response.send({
    districtId: selectedDistrict.district_id,
    districtName: selectedDistrict.district_name,
    stateId: selectedDistrict.state_id,
    cases: selectedDistrict.cases,
    cured: selectedDistrict.cured,
    active: selectedDistrict.active,
    deaths: selectedDistrict.deaths,
  });
});

// API 5: Delete a district by ID
app.delete(
  "/districts/:districtId/",
  authenticate,
  async (request, response) => {
    const { districtId } = request.params;
    const deleteDistrict = `
    Delete from district where district_id = ${districtId}
  `;
    await db.run(deleteDistrict);
    response.send("District Removed");
  }
);

// API 6: Update a district by ID
app.put("/districts/:districtId/", authenticate, async (request, response) => {
  const { districtId } = request.params;
  const districtDetails = request.body;
  const {
    districtName,
    stateId,
    cases,
    cured,
    active,
    deaths,
  } = districtDetails;
  const updateDistrictQuery = `
    Update district set 
      district_name = '${districtName}',
      state_id = '${stateId}',
      cases = ${cases},
      cured = ${cured},
      active = ${active},
      deaths = ${deaths}
  `;
  await db.run(updateDistrictQuery);
  response.send("District Details Updated");
});

// API 7: Get statistics of a specific state
app.get("/states/:stateId/stats/", authenticate, async (request, response) => {
  const { stateId } = request.params;
  const getStats = `
    Select 
      sum(cases) as totalCases , 
      sum(cured) as totalCured,
      sum(active) as totalActive, 
      sum(deaths) as totalDeaths
     from 
     district 
     where state_id = ${stateId}
  `;
  const stats = await db.get(getStats);
  response.send(stats);
});

// API 8: Get the state name of a district by district ID
app.get(
  "/districts/:districtId/details/",
  authenticate,
  async (request, response) => {
    const { districtId } = request.params;
    const getStateName = `
    Select state_name from 
     state inner join district on state.state_id = district.state_id
     where district_id = ${districtId}
  `;
    const name = await db.get(getStateName);
    response.send({ stateName: name.state_name });
  }
);

setupAndRunServer();
module.exports = app;
