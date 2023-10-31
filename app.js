require('dotenv').config()
const express = require("express");
const PORT = process.env.PORT;
const app = express();
const bodyParser =require("body-parser");
const mongoose = require("mongoose");
const model = require("./userModel");
const User = model.User;
const Problem = model.Problem;

app.use(express.static(__dirname + "/public"))
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));

mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  
  const db = mongoose.connection;
  
  db.on("error", console.error.bind(console, "connection error:"));
  db.once("open", function () {
    console.log("Connected to MongoDB...");
  });  

app.get("/", (req, res) => {
  Problem.find()
  .then(problems => {
    console.log(problems);
    res.render("index", {
      problems: problems,
    });
  })
  .catch(error => {
    console.log(error);
  });
});

app.get("/register", (req, res) => {
    res.render("account",{
      entrypoint: "Register",
    });
});

app.get("/login", (req, res) => {
  res.render("account", {
    entrypoint: "Login",
  });
});

app.listen(PORT, (req, res) => {
    console.log("App is listening on port: " + PORT);
    console.log("http://localhost:" + PORT);
}); 