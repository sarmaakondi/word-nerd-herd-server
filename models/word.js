const mongoose = require("mongoose");

const wordSchema = new mongoose.Schema({
    word: {
        type: String,
        required: true,
    },
    startsWith: {
        type: String,
        required: true,
    },
    meaning: {
        type: String,
        required: true,
    },
    examples: {
        type: [String],
        required: true,
    },
}, { timestamps: true });

module.exports = mongoose.model("Word", wordSchema);
