const mongoose = require("mongoose");

const learnedWordSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        word: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Word",
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("LearnedWord", learnedWordSchema);
