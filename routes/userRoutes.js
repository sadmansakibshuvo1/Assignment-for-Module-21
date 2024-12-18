const express = require("express");
const { getUserProfile, getAllUsers, updateUser, deleteUser } = require("../controllers/userController");
const { authenticate } = require("../middlewares/authMiddleware");

const router = express.Router();

router.get("/profile", authenticate, getUserProfile);
router.get("/all", authenticate, getAllUsers);
router.put("/profile", authenticate, updateUser);
router.delete("/profile", authenticate, deleteUser);

module.exports = router;
