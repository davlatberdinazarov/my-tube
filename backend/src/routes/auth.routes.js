const express = require("express");
const { authRegister, authLogin, authProfile, updateProfile } = require("../controllers/auth.controller");
const authMiddleware = require("../middleware/auth");


const router = express.Router();

// Registratsiya
router.post("/register", authRegister);

// Login
router.post("/login", authLogin);

// Himoyalangan route (faqat token orqali kirish mumkin)
router.get("/profile", authMiddleware, authProfile);
router.patch("/profile-update", authMiddleware, updateProfile);

module.exports = router;
