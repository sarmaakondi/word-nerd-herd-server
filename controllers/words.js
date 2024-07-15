const express = require("express");
const Word = require("../models/word");

const router = express.Router();

// come back and make routes private if we decide to go with that

// GET ALL WORDS
router.get("/", async (req, res) => {
    const response = {};
    try {
        const words = await Word.find({}).limit(5);
        response["words"] = JSON.parse(words);
        // response["count"] = .length();
        res.status(200).send(response);
    } catch (error) {
        res.status(500).json(error.message);
    }
});

// GET ONE WORD

module.exports = router;
