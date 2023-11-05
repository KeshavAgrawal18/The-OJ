require("dotenv").config();
const express = require("express");
const PORT = process.env.PORT;
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const model = require("./userModel");
const User = model.User;
const Problem = model.Problem;
const passport = require("passport");
const session = require("express-session");

app.use(express.static(__dirname + "/public"));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.session());
app.use(passport.initialize());

mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("Connected to MongoDB...");
});

passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.get("/", (req, res) => {
  Problem.find()
    .then((problems) => {
      console.log(problems);
      res.render("index", {
        problems: problems,
      });
    })
    .catch((error) => {
      console.log(error);
    });
});

app.get("/register", (req, res) => {
  res.render("account", {
    entrypoint: "Register",
  });
});

app.get("/login", (req, res) => {
  res.render("account", {
    entrypoint: "Login",
  });
});

app.post("/register", (req, res) => {
  console.log(req.body);
  User.register(
    { username: req.body.username, email: req.body.email },
    req.body.password,
    function (err, user) {
      if (err) {
        console.log(err);
        res.redirect("/register");
      } else {
        passport.authenticate("local")(req, res, function () {
          // console.log(user);
          res.redirect("/");
        });
      }
    }
  );
});

app.post("/login", (req, res) => {
  const user = new User({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  });
  console.log(user);
  req.login(user, (err) => {
    if (err) {
      console.log(err);
    } else {
      passport.authenticate("local")(req, res, function () {
        res.redirect("/");
      });
    }
  });
});

app.listen(PORT, (req, res) => {
  console.log("App is listening on port: " + PORT);
  console.log("http://localhost:" + PORT);
});
