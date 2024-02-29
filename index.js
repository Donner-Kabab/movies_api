const express = require("express"),
  app = express(),
  morgan = require("morgan");

let topMovies = [
  {
    title: "Howl's Movie Castle",
    directorName: "Hayao Miyazaki",
    genre: "Adventure",
    releaseYear: "2004",
  },
  {
    title: "The Silence of the Lambs",
    directorName: "Jonathan Demme",
    genre: "Thriller",
    releaseYear: "1991",
  },
  {
    title: "Spirited Away",
    directorName: "Hayao Miyazaki",
    genre: "Adventure",
    releaseYear: "2001",
  },
  {
    title: "Castle in the Sky",
    directorName: "Hayao Miyazaki",
    genre: "Adventure",
    releaseYear: "1986",
  },
  {
    title: "Ponyo",
    directorName: "Hayao Miyazaki",
    genre: "Adventure",
    releaseYear: "2008",
  },
  {
    title: "Princess Mononoke",
    directorName: "Mayao Miyazaki",
    genre: "Action",
    releaseYear: "1997",
  },
  {
    title: "Whisper of the Heart",
    directorName: "Yoshifumi Kondo",
    genre: "Drama",
    releaseYear: "1995",
  },
  {
    title: "Annabelle",
    directorName: "John R. Leonetti",
    genre: "Horror",
    releaseYear: "2014",
  },
  {
    title: "Annabelle: Creation",
    directorName: "David F. Sandberg",
    genre: "Horror",
    releaseYear: "2017",
  },
  {
    title: "Annabelle Comes Home",
    directorName: "Gary Dauberman",
    genre: "Horror",
    releaseYear: "2019",
  },
];

app.use(morgan("common"));

app.use(express.static("public"));

//GET requests
app.get("/", (req, res) => {
  res.send("Welcome to my Movie directory!");
});

app.get("/movies", (req, res) => {
  res.json(topMovies);
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke");
});

//Listen for requests
app.listen(8080, () => {
  console.log("This app is listening on port 8080.");
});
