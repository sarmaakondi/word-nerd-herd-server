const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const port = process.env.PORT || 3000;

const usersRouter = require("./controllers/users");
const profilesRouter = require("./controllers/profiles");

const wordsController = require("./controllers/words");
const learnedWordsController = require("./controllers/learnedWords");
const favoritedWordsController = require("./controllers/favoritedWords");

mongoose.connect(process.env.MONGODB_URI);

mongoose.connection.on("connected", () => {
    console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});
app.use(cors());
app.use(express.json());

// Routes go here
app.use("/users", usersRouter);
app.use("/profiles", profilesRouter);
app.use("/words", wordsController);
app.use("/learnedWords", learnedWordsController);
app.use("/favoritedWords", favoritedWordsController);

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
