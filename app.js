const express = require("express")
const PORT = 3000;
const app = express();

app.use(express.static(__dirname + "/public/"))
app.set("view engine", "ejs");

app.get("/", (req, res) => {
    res.render("index");
});

app.listen(PORT, (req, res) => {
    console.log("App is listening on port: " + PORT);
    console.log("http://localhost:" + PORT);
});