const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  logout,
  authMiddleware,
} = require("../controllers/authController");

router.post("/register", registerUser); // Fixed typo in the route
router.post("/login", loginUser);
router.post("/logout", logout);
router.get("/check-auth", authMiddleware, (req, res) => {
  const user = req.user;
  res.status(200).json({
    success: true,
    message: "Authenticated user!",
    user,
  });
});

module.exports = router; // Fixed typo in module.exports