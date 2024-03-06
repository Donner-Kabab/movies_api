const express = require("express"),
  app = express(),
  bodyParser = require("body-parser"),
  uuid = require("uuid"),
  morgan = require("morgan");

app.use(bodyParser.json());

let movies = [
  {
    Title: "Howl's Moving Castle",
    Director: {
      Name: "Hayao Miyazaki",
      BirthYear: 1941,
    },
    Genre: {
      Name: "Adventure",
    },
    ReleaseYear: "2004",
  },
  {
    Title: "The Silence of the Lambs",
    Director: {
      Name: "Jonathan Demme",
      BirthYear: 1944,
    },
    Genre: {
      Name: "Thriller",
    },
    ReleaseYear: "1991",
  },
  {
    Title: "Spirited Away",
    Director: {
      Name: "Hayao Miyazaki",
      BirthYear: 1941,
    },
    Genre: {
      Name: "Adventure",
    },
    ReleaseYear: "2001",
  },
  {
    Title: "Castle in the Sky",
    Director: {
      Name: "Hayao Miyazaki",
      BirthYear: 1941,
    },
    Genre: {
      Name: "Adventure",
    },
    ReleaseYear: "1986",
  },
  {
    Title: "Ponyo",
    Director: {
      Name: "Hayao Miyazaki",
      BirthYear: 1941,
    },
    Genre: {
      Name: "Adventure",
    },
    ReleaseYear: "2008",
  },
  {
    Title: "Princess Mononoke",
    Director: {
      Name: "Mayao Miyazaki",
      BirthYear: 1941,
    },
    Genre: {
      Name: "Action",
    },
    ReleaseYear: "1997",
  },
  {
    Title: "Whisper of the Heart",
    Director: {
      Name: "Yoshifumi Kondo",
      BirthYear: 1950,
    },
    Genre: {
      Name: "Drama",
    },
    ReleaseYear: "1995",
  },
  {
    Title: "Annabelle",
    Director: {
      Name: "John R. Leonetti",
      BirthYear: 1956,
    },
    Genre: {
      Name: "Horror",
    },
    ReleaseYear: "2014",
  },
  {
    Title: "Annabelle: Creation",
    Director: {
      Name: "David F. Sandberg",
      BirthYear: 1981,
    },
    Genre: {
      Name: "Horror",
    },
    ReleaseYear: "2017",
  },
  {
    Title: "Annabelle Comes Home",
    Director: {
      Name: "Gary Dauberman",
      BirthYear: "N/A",
    },
    Genre: {
      Name: "Horror",
    },
    ReleaseYear: "2019",
  },
];

let users = [
  {
    id: 1,
    Username: "JohnDoe",
    Email: "Johndoe@gmail.com",
    Birthdate: "01/01/00",
    favoriteMovies: [],
  },
];

app.use(morgan("common"));

app.use(express.static("public"));

//GET requests
app.get("/", (req, res) => {
  res.send("Welcome to my Movie directory!");
});

//Create new user*
app.post("/users", (req, res) => {
  const newUser = req.body;

  if (newUser.name) {
    newUser.id = uuid.v4();
    users.push(newUser);
    res.status(201).json(newUser);
  } else {
    res.status(400).send("users need names");
  }
});

//Update user id **
app.put("/users/:id", (req, res) => {
  const { id } = req.params;
  const updatedUser = req.body;

  let user = users.find((user) => user.id == id);

  if (user) {
    user.name = updatedUser.name;
    res.status(200).json(user);
  } else {
    res.status(400).send("No such user");
  }
});

//Create add movie to favories ***
app.post("/users/:id/:movieTitle", (req, res) => {
  const { id, movieTitle } = req.params;

  let user = users.find((user) => user.id == id);

  if (user) {
    user.favoriteMovies.push(movieTitle);
    res.status(200).send("${movieTitle} has been added to user ${id}'s array");
  } else {
    res.status(400).send("No such user");
  }
});

//Delete remove movie title ****
app.delete("/users/:id/:moveTitle", (req, res) => {
  const { id, movieTitle } = req.params;

  let user = users.find((user) => user.id == id);

  if (user) {
    user.favoriteMovies = user.favoriteMovies.filter(
      (title) => title !== movieTitle
    );
    res
      .status(200)
      .send("${movieTitle} has been removed from user ${id}'s array");
  } else {
    res.status(400).send("No such user");
  }
});

//Delete user *****
app.delete("/users/:id/", (req, res) => {
  const { id } = req.params;

  let user = users.find((user) => user.id == id);

  if (user) {
    users = user.filter((user) => user.id != id);
    res.status(200).send("user ${id} has been deleted");
  } else {
    res.status(400).send("No such user");
  }
});

//Read*
app.get("/movies", (req, res) => {
  res.status(200).json(movies);
});

//Read*
app.get("/movies/:title", (req, res) => {
  const { title } = req.params;
  const movie = movies.find((movie) => movie.Title === title);

  if (movie) {
    res.status(200).json(movie);
  } else {
    res.status(400).send("no such movie");
  }
});

//Read*
app.get("/movies/genre/:genreName", (req, res) => {
  const { genreName } = req.params;
  const genre = movies.find((movie) => movie.Genre.Name === genreName).Genre;

  if (genre) {
    res.status(200).json(genre);
  } else {
    res.status(400).send("no such genre");
  }
});

//Read*
app.get("/movies/director/:directorName", (req, res) => {
  const { directorName } = req.perams;
  const director = movie.find(
    (movie) => movie.Director.Name === directorName
  ).Directors;

  if (director) {
    res.status(200).json(director);
  } else {
    res.status(400).send("no such director");
  }
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke");
});

//Listen for requests
app.listen(8080, () => {
  console.log("This app is listening on port 8080.");
});
