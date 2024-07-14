const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            unique: true,
            required: true,
        },
        username: {
            type: String,
            required: true,
        },
        hashedPassword: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

userSchema.set("toJSON", {
    transform: (document, returnedObject) => {
        delete returnedObject.hashedPassword;
    },
});

module.exports = mongoose.model("User", userSchema);
