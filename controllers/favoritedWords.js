const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/verify-token");

const favoritedWord = require("../models/favoritedWord");
const Word = require("../models/word");

router.use(verifyToken);

//POST FAVORITED WORD
router.post("/:id", async (req, res) => {
    try {
        const query = { user: req.user._id, word: req.params.id };
        const existingFavoritedWord = await favoritedWord.find(query);
        if (existingFavoritedWord.length > 0)
            return res.status(200).json({
                message: "The current word is already marked as favorited.",
            });
        const response = await favoritedWord.create({
            user: req.user._id,
            word: req.params.id,
        });
        res.status(201).json(response);
    } catch (error) {
        res.status(500).json(error.message);
    }
});

// GET ALL FAVORITED WORDS
router.get("/words", async (req, res) => {
    const response = {};
    try {
        const query = { user: req.user._id };
        const favoritedWords = await favoritedWord.find(query).limit(5);
        const wordIds = favoritedWords.map(
            (favoritedWord) => favoritedWord["word"]
        );
        const words = await Word.find({ _id: { $in: wordIds } });
        const updatedWords = words.map((word) => {
            return { ...word["_doc"], isFavorited: true };
        });
        response["words"] = updatedWords;
        response["count"] = response["words"].length;
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json(error.message);
    }
});

//GET ALL FAVORITED WORDS COUNT
router.get("/count", async (req, res) => {
    try {
        const query = { user: req.user._id };
        const response = await favoritedWord.countDocuments(query);
        res.status(200).json({ count: response });
    } catch (error) {
        res.status(500).json(error.message);
    }
});

//UNFAVORITE A WORD
router.delete("/:id", async (req, res) => {
    try {
        const query = { user: req.user._id, word: req.params.id };
        const existingFavoritedWord = await favoritedWord.find(query);
        if (existingFavoritedWord.length === 0)
            return res.status(200).json({
                message: "The current word has not been favorited yet.",
            });
        const response = await favoritedWord.findOneAndDelete(query);
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json(error.message);
    }
});

module.exports = router;
