const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

let movieSchema = mongoose.Schema({
  Title: { type: String, required: true },
  //this information is required
  Description: { type: String, required: true },
  //this information is required
  Genre: {
    Name: String,
    //subdocuments
    Description: String,
  },
  Director: {
    Name: String,
    Bio: String,
  },
  ImagePath: String,
  Featured: Boolean,
});

let userSchema = mongoose.Schema({
  Username: { type: String, required: true },
  //this information is required
  Password: { type: String, required: true },
  //this information is required
  Email: { type: String, required: true },
  //this information is required
  Birthday: Date,
  FavoriteMovies: [{ type: mongoose.Schema.Types.ObjectId, ref: "Movie" }], //reference
});

//hashes submitted passwords
userSchema.statics.hashPassword = (password) => {
  return bcrypt.hashSync(password, 10);
};

//compares submitted hashed passwords with the hashed passwords stored in the database
userSchema.methods.validatePassword = function (password) {
  return bcrypt.compareSync(password, this.Password);
};

let directorSchema = mongoose.Schema({
  Name: { type: String, required: true },
  Bio: { type: String, required: true },
  Birth: { type: Date, required: true },
});

//after defining your schemas, create models to use the defined schemas
let Movie = mongoose.model("Movie", movieSchema);
let User = mongoose.model("User", userSchema);
let Director = mongoose.model("Directors", directorSchema);

//exports modules so we can import to index.js
module.exports.Movie = Movie;
module.exports.User = User;
module.exports.Director = Director;
