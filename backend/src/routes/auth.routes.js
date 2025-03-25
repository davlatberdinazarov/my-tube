const express = require("express");
const { authRegister, authLogin, authProfile } = require("../controllers/auth.controller");
const authMiddleware = require("../middleware/auth");


const router = express.Router();

// Registratsiya
router.post("/register", authRegister);

// Login
router.post("/login", authLogin);

// Himoyalangan route (faqat token orqali kirish mumkin)
router.get("/profile", authMiddleware, authProfile);

module.exports = router;
