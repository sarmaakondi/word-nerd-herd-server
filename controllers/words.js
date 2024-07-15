const express = require("express");
const verifyToken = require("../middleware/verify-token");
const Word = require("../models/word");
const learnedWord = require("../models/learnedWord");

const router = express.Router();

// PUBLIC ROUTES

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

router.use(verifyToken);

// AUTHENTICATED ROUTES

// GET ALL WORDS
router.get("/user/v1", async (req, res) => {
    const response = {};
    try {
        const query = { user: req.user._id };
        const existingLearnedWord = await learnedWord.find(query);
        console.log(existingLearnedWord);
        const words = await Word.find({}).limit(10);
        response["words"] = words;
        response["count"] = response["words"].length;
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json(error.message);
    }
});

module.exports = router;
