const mongoose = require("mongoose")

const Game = mongoose.model("Game", {
    title: { type: String, unique: true, required: true },
    developer: { type: String, unique: false, default: "Unknown" },
    publisher: { type: String, unique: false, default: "Unknown" },
    year: { type: Number, default: "????" }
});

module.exports = Game