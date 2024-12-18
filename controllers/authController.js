const User = require("../models/User");
const jwt = require("jsonwebtoken");
const config = require("../config");

exports.registerUser = async (req, res) => {
    try {
        const { firstName, lastName, NIDNumber, phoneNumber, password, bloodGroup } = req.body;
        const user = new User({ firstName, lastName, NIDNumber, phoneNumber, password, bloodGroup });
        await user.save();
        res.status(201).json({ message: "User registered successfully!" });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.loginUser = async (req, res) => {
    try {
        const { phoneNumber, password } = req.body;
        const user = await User.findOne({ phoneNumber });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ error: "Invalid credentials" });
        }

        const token = jwt.sign({ id: user._id }, config.JWT_SECRET, { expiresIn: "1h" });
        res.cookie("token", token, { httpOnly: true });
        res.status(200).json({ message: "Login successful", token });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
