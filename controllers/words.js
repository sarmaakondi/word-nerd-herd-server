const express = require("express");
const Word = require("../models/word");

const router = express.Router();

// come back and make routes private if we decide to go with that

// GET ALL WORDS
router.get("/", async (req, res) => {
    const response = {};
    try {
        const words = await Word.find({}).limit(10);
        response["words"] = words;
        response["count"] = response["words"].length;
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json(error.message);
    }
});

// GET ONE WORD
router.get("/:id", async (req, res) => {
    try {
        const response = await Word.findById(req.params.id);
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json(error.message);
    }
});

// We may not actually need to call this router in the front end.

module.exports = router;
