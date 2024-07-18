const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/verify-token");

const learnedWord = require("../models/learnedWord");
const Word = require("../models/word");

router.use(verifyToken);

// POST LEARNED WORD
router.post("/:id", async (req, res) => {
    try {
        const query = { user: req.user._id, word: req.params.id };
        const existingLearnedWord = await learnedWord.find(query);
        if (existingLearnedWord.length > 0)
            return res.status(200).json({
                message: "The current word is already marked as learned.",
            });
        const response = await learnedWord.create({
            user: req.user._id,
            word: req.params.id,
        });
        res.status(201).json(response);
    } catch (error) {
        res.status(500).json(error.message);
    }
});

// GET ALL LEARNED WORDS
router.get("/words", async (req, res) => {
    const response = {};
    try {
        const query = { user: req.user._id };
        const learnedWords = await learnedWord.find(query).limit(5);
        const wordIds = learnedWords.map((learnedWord) => learnedWord["word"]);
        const words = await Word.find({ _id: { $in: wordIds } });
        const updatedWords = words.map((word) => {
            return { ...word["_doc"], isLearning: true };
        });
        response["words"] = updatedWords;
        response["count"] = response["words"].length;
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json(error.message);
    }
});

// CHECK FOR LEARNED WORD
router.get("/:id", async (req, res) => {
    try {
        const query = { user: req.user._id, word: req.params.id };
        const response = await learnedWord.find(query);
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json(error.message);
    }
});

// GET ALL LEARNED WORDS COUNT
router.get("/count", async (req, res) => {
    try {
        const query = { user: req.user._id };
        const response = await learnedWord.countDocuments(query);
        res.status(200).json({ count: response });
    } catch (error) {
        res.status(500).json(error.message);
    }
});

module.exports = router;
