const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    NIDNumber: { type: String, unique: true, required: true },
    phoneNumber: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    bloodGroup: { type: String, required: true },
});

// Hash password before saving
userSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});

module.exports = mongoose.model("User", userSchema);
