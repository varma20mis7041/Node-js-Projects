const express = require("express");
const app = express();
app.use(express.json());
const { open } = require("sqlite");

const path = require("path");
const dbPath = path.join(__dirname, "moviesData.db");

let db = null;

const sqlite3 = require("sqlite3");
const setup = async () => {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    });
    app.listen(3004, () => {
      console.log("server started");
    });
  } catch (error) {
    console.log(`db error ${error}`);
    process.exit(1);
  }
};

const formateObject = (obj) => ({
  movieId: obj.movie_id,
  directorId: obj.director_id,
  movieName: obj.movie_name,
  leadActor: obj.lead_actor,
});

app.get("/movies/", async (request, response) => {
  const getAllMovies = `
        SELECT * FROM movie;
    `;
  const movieResponse = await db.all(getAllMovies);
  console.log(movieResponse);
  response.send(
    movieResponse.map((eachMovie) => ({ movieName: eachMovie.movie_name }))
  );
});

app.post("/movies/", async (request, response) => {
  const movieDetails = request.body;
  console.log(movieDetails);
  const { directorId, movieName, leadActor } = movieDetails;
  const addMovieQuery = `
    insert into movie  
    (director_id,movie_name,lead_actor)
    values (
        ${directorId},
        '${movieName}',
        '${leadActor}'
    )
  `;
  await db.run(addMovieQuery);
  response.send("Movie Successfully Added");
});

app.get("/movies/:movieId/", async (request, response) => {
  const { movieId } = request.params;
  console.log(movieId);
  const getSinglePlayerQuery = `
select * from movie where movie_id = ${movieId}
  `;
  console.log(getSinglePlayerQuery);
  const movieDetails = await db.get(getSinglePlayerQuery);
  console.log(movieDetails);
  response.send(formateObject(movieDetails));
});

app.put("/movies/:movieId/", async (request, response) => {
  const { movieId } = request.params;
  const movieDetails = request.body;
  const { directorId, movieName, leadActor } = movieDetails;
  console.log(movieDetails);
  const updateMovieDetails = `
  update  movie set 
      director_id = ${directorId},
      movie_name = '${movieName}',
      lead_actor = '${leadActor}' 
      where movie_id  = ${movieId}
  
  `;
  await db.run(updateMovieDetails);
  response.send("Movie Details Updated");
});

app.delete("/movies/:movieId/", async (request, response) => {
  const { movieId } = request.params;
  const deleteMovie = `
  delete from movie where movie_id = ${movieId}
  `;
  await db.run(deleteMovie);
  response.send("Movie Removed");
});

app.get("/directors/", async (request, response) => {
  const getAllDirectors = `
    select * from director
    `;
  const directors = await db.all(getAllDirectors);
  response.send(
    directors.map((eachDirector) => ({
      directorId: eachDirector.director_id,
      directorName: eachDirector.director_name,
    }))
  );
});

app.get("/directors/:directorId/movies/", async (request, response) => {
  const { directorId } = request.params;
  const getMovieQuery = `
  select * from movie where director_id = ${directorId}
  `;
  const movieDetails = await db.all(getMovieQuery);
  response.send(
    movieDetails.map((eachMovie) => ({ movieName: eachMovie.movie_name }))
  );
});

setup();

module.exports = app;
