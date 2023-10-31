const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    username: String,
    email: String,
    password: String,
});

const problemSchema = mongoose.Schema({
    id: String,
    CODE: String,
    Name: String,
    Difficulty: String,
});

const User = new mongoose.model("User", userSchema);

const Problem = new mongoose.model("Problem", problemSchema);

module.exports = {
    User: User, 
    Problem: Problem,
};