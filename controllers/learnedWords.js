const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/verify-token");

const learnedWord = require("../models/learnedWord");

router.use(verifyToken);

// POST LEARNED WORD
router.post("/:id", async (req, res) => {
    try {
        const response = await learnedWord.create({
            user: req.user._id,
            word: req.params.id,
        });
        res.status(201).json(response);
    } catch (error) {
        res.status(500).json(error.message);
    }
});

// GET ALL LEARNED WORDS COUNT

// GET ALL LEARNED WORDS
router.get("/count", async (req, res) => {
    try {
        const query = { user: req.user._id };
        const response = await learnedWord.estimatedDocumentCount(query);
        res.status(200).json({ count: response });
    } catch (error) {
        res.status(500).json(error.message);
    }
});

module.exports = router;
