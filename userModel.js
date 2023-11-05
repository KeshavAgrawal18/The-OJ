const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

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

userSchema.plugin(passportLocalMongoose);

const User = new mongoose.model("User", userSchema);

const Problem = new mongoose.model("Problem", problemSchema);

module.exports = {
    User: User, 
    Problem: Problem,
};