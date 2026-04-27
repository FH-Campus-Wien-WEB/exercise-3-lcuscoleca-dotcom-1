const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const movieModel = require('./movie-model.js');

const app = express();

// Parse urlencoded bodies
app.use(bodyParser.json()); 

// Serve static content in directory 'files'
app.use(express.static(path.join(__dirname, 'files')));

// Configure a 'get' endpoint for all movies..
app.get('/movies', function (req, res) {
  let moviesArray = Object.values(movieModel);
  
  // Filter by genre if query parameter is provided
  const genre = req.query.genre;
  if (genre) {
    moviesArray = moviesArray.filter(function(movie) {
      return movie.Genres.includes(genre);
    });
  }
  
  res.json(moviesArray);
})

// Get endpoint for genres
app.get('/genres', function (req, res) {
  const genresSet = new Set();
  
  Object.values(movieModel).forEach(function(movie) {
    movie.Genres.forEach(function(genre) {
      genresSet.add(genre);
    });
  });
  
  const genresArray = Array.from(genresSet).sort();
  res.json(genresArray);
})

//endpoint get based on ImdbID 
app.get('/movies/:imdbID', function (req, res) {
  const imdbID = req.params.imdbID;

  const movie = movieModel[imdbID];

  if (movie) {
    res.send(movie);
  } else {
    res.sendStatus(404);
  }
})

app.put('/movies/:imdbID', function (req, res) {
  const imdbID = req.params.imdbID;
  const movieData = req.body;

  const exists = !!movieModel[imdbID];

  movieData.imdbID = imdbID;

  movieModel[imdbID] = movieData;

  if (exists) {
    return res.sendStatus(200); // Update
  } else {
    return res.status(201).send(movieData); // Create
  }
});

app.listen(3000)

console.log("Server now listening on http://localhost:3000/")

