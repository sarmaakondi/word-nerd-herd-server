const mongoose = require("mongoose");

const favoritedWordSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        word: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Word",
            required: true,
        },
    },

    { timestamps: true }
);

module.exports = mongoose.model("FavoritedWord", favoritedWordSchema);
