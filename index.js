const express = require("express"),
  morgan = require("morgan");
const app = express();
app.use(morgan("common"));

let myLogger = (req, res, next) => {
  console.log(req.url);
  next();
};

app.use(myLogger);

//GET requests
app.get("/", (req, res) => {
  res.send("Welcome to my Movie directory!");
});

app.get("/documentation", (req, res) => {
  res.sendFile("public/documentation.html", { root: __dirname });
});

app.get("/movies", (req, res) => {
  res.json(topMovies);
});

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

// Static
app.use(
  "/documentation",
  express.static("public", { index: "documentation.html" })
);

//Listen for requests
app.listen(8080, () => {
  console.log("This app is listening on port 8080.");
});
