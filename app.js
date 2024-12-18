const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const config = require("./config");

const app = express();
app.use(bodyParser.json());
app.use(cookieParser());

mongoose
    .connect(config.MONGO_URI)
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.error(err));

app.use("/auth", authRoutes);
app.use("/user", userRoutes);

const PORT = 5002;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
