const express = require("express"),
  app = express(),
  bodyParser = require("body-parser"),
  //uuid = require("uuid");
  morgan = require("morgan");

app.use(bodyParser.json());

let movies = [
  {
    title: "Howl's Movie Castle",
    director: {
      Name: "Hayao Miyazaki",
    },
    genre: {
      Name: "Adventure",
    },
    releaseYear: "2004",
  },
  {
    title: "The Silence of the Lambs",
    director: {
      Name: "Jonathan Demme",
    },
    genre: {
      Name: "Thriller",
    },
    releaseYear: "1991",
  },
  {
    title: "Spirited Away",
    director: {
      Name: "Hayao Miyazaki",
    },
    genre: {
      name: "Adventure",
    },
    releaseYear: "2001",
  },
  {
    title: "Castle in the Sky",
    directorName: "Hayao Miyazaki",
    genre: {
      name: "Adventure",
    },
    releaseYear: "1986",
  },
  {
    title: "Ponyo",
    directorName: "Hayao Miyazaki",
    genre: {
      name: "Adventure",
    },
    releaseYear: "2008",
  },
  {
    title: "Princess Mononoke",
    directorName: "Mayao Miyazaki",
    genre: {
      name: "Action",
    },
    releaseYear: "1997",
  },
  {
    title: "Whisper of the Heart",
    directorName: "Yoshifumi Kondo",
    genre: {
      name: "Drama",
    },
    releaseYear: "1995",
  },
  {
    title: "Annabelle",
    directorName: "John R. Leonetti",
    genre: {
      name: "Horror",
    },
    releaseYear: "2014",
  },
  {
    title: "Annabelle: Creation",
    directorName: "David F. Sandberg",
    genre: {
      name: "Horror",
    },
    releaseYear: "2017",
  },
  {
    title: "Annabelle Comes Home",
    directorName: "Gary Dauberman",
    genre: {
      name: "Horror",
    },
    releaseYear: "2019",
  },
];

let users = [
  {
    username: "JohnDoe",
    password: "Password",
    email: "Johndoe@gmail.com",
    birthdate: "01/01/00",
  },
];

app.use(morgan("common"));

app.use(express.static("public"));

//GET requests
app.get("/", (req, res) => {
  res.send("Welcome to my Movie directory!");
});

//Create***********
app.post("/users", (req, res) => {
  const newUser = req.body;

  if (newUser.name) {
    newUser.id = uuid.v4;
    users.push(newUser);
    res.status(201).json(users);
  } else {
    res.status(400).send("users need names");
  }
});

//Update **********
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

//Create ***********
app.post("/users/:id/:moveTitle", (req, res) => {
  const { id, movieTitle } = req.params;

  let user = users.find((user) => user.id == id);

  if (user) {
    user.favoriteMovies.push(movieTitle);
    res.status(200).send("${movieTitle} has been added to user ${id}'s array");
  } else {
    res.status(400).send("No such user");
  }
});

//Delete ***********
app.delete("/users/:id/:moveTitle", (req, res) => {
  const { id, movieTitle } = req.params;

  let user = users.find((user) => user.id == id);

  if (user) {
    user.favoriteMovies = user.favoriteMovies.filter(
      (title) => title !== movieTitle
    );
    res.status(200).send("${movieTitle} has been added to user ${id}'s array");
  } else {
    res.status(400).send("No such user");
  }
});

//Delete ***********
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

//Read*************
app.get("/movies", (req, res) => {
  res.status(200).json(topMovies);
});

//Read**************
app.get("/movies/:title", (req, res) => {
  const { title } = req.perams.title;
  const movie = movie.find((movie) => movie.Title === title);

  if (movie) {
    res.status(200).json(movie);
  } else {
    res.status(400).send("no such movie");
  }
});

//Read***********
app.get("/movies/genre/:genreName", (req, res) => {
  const genreName = req.params;
  const genre = movie.find((movie) => movie.Genre.Name === genreName).Genre;

  if (genre) {
    res.status(200).json(genre);
  } else {
    res.status(400).send("no such genre");
  }
});

//Read***********
app.get("/movies/director/:directorName", (req, res) => {
  const directorName = req.perams;
  const director = movie.find(
    (movie) => movie.Director.Name === directorName
  ).Director;

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
