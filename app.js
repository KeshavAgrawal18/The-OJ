require('dotenv').config()
const express = require("express");
const PORT = process.env.PORT;
const app = express();
const bodyParser =require("body-parser");
const mongoose = require("mongoose");

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
    res.render("index");
});

app.listen(PORT, (req, res) => {
    console.log("App is listening on port: " + PORT);
    console.log("http://localhost:" + PORT);
}); 