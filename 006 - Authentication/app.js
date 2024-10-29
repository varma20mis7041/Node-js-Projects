const express = require("express");
const app = express();
app.use(express.json());

const { open } = require("sqlite");
const sqlite3 = require("sqlite3");

const path = require("path");
const databasePath = path.join(__dirname, "userData.db");
let db = null;

const bcrypt = require("bcrypt");

const setupDatabaseAndServer = async () => {
  try {
    db = await open({
      filename: databasePath,
      driver: sqlite3.Database,
    });
    app.listen(3000, () => {
      console.log("server is up and running");
    });
  } catch (error) {
    console.log(error);
  }
};

// API 1: Register a new user
// Checks if the username exists. If not, hashes the password and registers the user.
app.post("/register", async (request, response) => {
  const userDetails = request.body;
  const { username, password, name, gender, location } = userDetails;
  const selectUser = `select * from user where username = '${username}' `;
  const dbUser = await db.get(selectUser);
  if (dbUser !== undefined) {
    response.status(400);
    response.send("User already exists");
  } else {
    if (password.length < 5) {
      response.status(400);
      response.send("Password is too short");
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      const createUser = `
      insert into user 
      (username,name,password,gender,location) 
      values (
          '${username}',
          '${name}',
          '${hashedPassword}',
          '${gender}',
          '${location}'
      ) 
      `;
      await db.run(createUser);
      response.send("User created successfully");
    }
  }
});

// API 2: User login
// Validates username and password, returning a success message if they match.
app.post("/login", async (request, response) => {
  const loginDetails = request.body;
  const { username, password } = loginDetails;
  const selectUser = `select * from user where username = '${username}'`;
  const dbUser = await db.get(selectUser);
  if (dbUser === undefined) {
    response.status(400);
    response.send("Invalid user");
  } else {
    const isPasswordMatched = await bcrypt.compare(password, dbUser.password);
    if (isPasswordMatched) {
      response.send("Login success!");
    } else {
      response.status(400);
      response.send("Invalid password");
    }
  }
});

// API 3: Change user password
// Validates current password and updates to a new password if valid.
app.put("/change-password", async (request, response) => {
  const passwordDetails = request.body;
  const { username, oldPassword, newPassword } = passwordDetails;
  const selectUser = `select * from user where username = '${username}'`;
  const dbUser = await db.get(selectUser);
  const isPasswordMatched = await bcrypt.compare(oldPassword, dbUser.password);
  if (isPasswordMatched) {
    if (newPassword.length < 5) {
      response.status(400);
      response.send("Password is too short");
    } else {
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      const updateQuery = `update user set password = '${hashedPassword}' 
      where username = '${username}'
      `;
      await db.run(updateQuery);
      response.send("Password updated");
    }
  } else {
    response.status(400);
    response.send("Invalid current password");
  }
});

setupDatabaseAndServer();
module.exports = app;
